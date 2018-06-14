# app/__init__.py
import json
import jsonschema
import random
from flask_api import FlaskAPI, status
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, Text, Integer
from flask import request, jsonify, abort, make_response
from shapely.geometry import shape, Point
from sqlalchemy import text

from flask_graphql import GraphQLView

from shapely.geometry import shape, Point

# local import

from instance.config import app_config

# For password hashing
from flask_bcrypt import Bcrypt

# initialize db
db = SQLAlchemy()

from app.ng_event_models import Card, Page, PageCard, Store, NYPD, CardPosition
from app.user_models import User, Session, Favourite

loggedinuser = 0

def create_app(config_name):

    app = FlaskAPI(__name__, instance_relative_config=True)
    # overriding Werkzeugs built-in password hashing utilities using Bcrypt.
    bcrypt = Bcrypt(app)

    app.config.from_object(app_config[config_name])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    @app.route('/api/real/login/account', methods=['POST'])
    def login():

        password = request.data.get('password', '')
        userName    = request.data.get('userName', '')

        user = User.get_all().filter(User.userName == userName).first()

        if user is not None:
          response = jsonify({'status' : 'ok', 'type' : 'account', 'userId' : user.id, 'currentAuthority': 'admin'})
          loggedinuser = user.id
          session = Session(user.id)
          session.save()

          print ('saved')
          return make_response(response), 200

        return make_response(jsonify({'status': 'error', 'type' : 'account', 'currentAuthority': 'guest'})), 200

    @app.route('/api/real/logout', methods=['POST'])
    def logout():
        Session.delete_all()
        return make_response(jsonify({'status': 'ok'})), 200

    @app.route('/api/real/currentUser', methods=['GET'])
    def currentUser():

        session = Session.get_all().first()

        if session == None:
          return make_response(jsonify({'status': 'ok', 'type' : 'account', 'currentAuthority': 'guest'})), 200

        print (session.userId)
        user = User.get_all().filter(User.id == session.userId).first()

        res = user.serialise()

        res['favourites'] = []
        #for fav in user.favourites:
        # res['favourites'].append(Card.get_all().filter(Card.id == fav.cardId).first().serialise())



        response = jsonify(res)
        return make_response(response), 200

    @app.route('/api/real/pages', methods=['GET'])
    def getPages():

      pages = Page.query.filter(Page.url == "dashboard/crossfiltermap")

      results = []
      for page in pages:
        results.append(page.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/real/cardpositions', methods=['GET', 'POST'])
    def getCardPositions():
      url = request.data.get('url', "/dashboard/analysis")
      page = Page.query.filter(Page.url == url).first()

      #get all cards for this page
      cardpositions = CardPosition.query.filter(CardPosition.pageId == page.id).all()
      dict = {int(k):v.card for k,v in  ([ (x.position), x] for x in cardpositions) }

      return make_response(jsonify(dict)), 200

    @app.route('/api/real/favourites', methods=['GET'])
    def getFavourites():

      favs = Favourite.query.all()

      results = []
      for fav in favs:
        results.append(page.serialise())

      return make_response(jsonify({ 'list' : results })), 200


    @app.route('/api/real/favourites', methods=['POST'])
    def create_fav():

      userId = request.data.get('userId', 0)
      cardId = request.data.get('cardId', 0)

      fav = Favourite(userId, cardId)
      fav.save()

      favs = Favourite.get_all().all()

      results = []
      for fav in favs:
       results.append(fav.serialise())

      return make_response(jsonify({ 'list' : results })), 200



    @app.route('/api/real/admin/cardmappings', methods=['POST'])
    def list_cardmappings():

      url = request.data.get('url', '')
      userId = request.data.get('userId', 0)
      page = Page.get_all().filter(Page.url == url).one()

      mappings = PageCard.get_all().filter(PageCard.pageId == page.id).filter(PageCard.userId == userId).order_by(PageCard.id).all()

      results = []
      for mapping in mappings:
       results.append(mapping.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/real/admin/cardmappings/<id>', methods=['POST'])
    def update_cardmapping(id):

      enabled = request.data.get('enabled', 'N')
      url = request.data.get('url', '')
      userId = request.data.get('userId', 0)

      mapping = PageCard.get_all().filter(PageCard.id == id).one()
      mapping.enabled = enabled
      mapping.save();

      page = Page.get_all().filter(Page.url == url).one()
      mappings = PageCard.get_all().filter(PageCard.userId == userId).filter(PageCard.pageId == page.id).order_by(PageCard.id).all()

      results = []
      for mapping in mappings:
       results.append(mapping.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/real/cards', methods=['POST'])
    def list_cards():

      userid = request.data.get('userid', '0')
      url = request.data.get('url', '')
      type = request.data.get('type', '')
      id   = str(request.data.get('id', ''))

      sql = text('select id from cards where component IN ( SELECT component FROM pagecard JOIN page ON (pagecard.\"pageId\" = page.id AND pagecard.\"userId\" = ' + str(userid) + ' AND pagecard.enabled = \'Y\') WHERE url = \'' + url + '\') and key->> \'type\' = \'' + type + '\' and key->>\'id\' = \'' + id + '\'')
      print (sql)
      result = db.engine.execute(sql)

      cardids = []
      for row in result:
          cardids.append(row[0])

      cards = Card.get_all().filter(Card.id.in_(cardids)).order_by(Card.order).all()

      results = []
      for card in cards:
         results.append(card.serialise())

      return make_response(jsonify({ 'list' : results })), 200


    @app.route('/api/real/cards/<id>', methods=['GET'])
    def get_card(id):

      cards = Card.get_all().filter(Card.id == id).order_by(Card.order).all()

      results = []
      for card in cards:
         results.append(card.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/real/favourites/clear', methods=['POST'])
    def clearfav():
        userid = request.data.get('userId', '0')
        Favourite.delete_all(userid)
        return make_response(jsonify({'status': 'ok'})), 200


    return app


