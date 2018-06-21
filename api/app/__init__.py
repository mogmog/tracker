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
import urllib.request, json

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
from app.importer_models import Country

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
      userId = request.data.get('userId', 0)

      position = request.data.get('position', None)

      page = Page.query.filter(Page.url == url).first()

      #get all cards for this page, with optional position parameter
      if position == None:
        cardpositions = CardPosition.query.filter(CardPosition.pageId == page.id).filter(CardPosition.userId == userId)
      else :
        cardpositions = CardPosition.query.filter(CardPosition.pageId == page.id).filter(CardPosition.userId == userId).filter(CardPosition.position == position)

      results = []
      for cardposition in cardpositions.all():
              results.append(cardposition.serialise())

      return make_response(jsonify({ 'list' : results })), 200


    @app.route('/api/real/cardpositions/new', methods=['POST'])
    def newCardPositions():

      cardId = request.data.get('cardId', 0)
      position = request.data.get('position', 0)
      key = request.data.get('key', {})

      cardposition = CardPosition(1, cardId, 1, 4, position, key)
      cardposition.save()

      return make_response(jsonify(cardposition.serialise())), 200


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

      sql = text('select id from cards where key->> \'type\' = \'' + type + '\' and key->>\'id\' = \'' + id + '\'')
      print (sql)
      result = db.engine.execute(sql)

      cardids = []
      for row in result:
          cardids.append(row[0])

      cards = Card.get_all().filter(Card.id.in_(cardids)).all()

      results = []
      for card in cards:
         results.append(card.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/real/cards/new', methods=['POST'])
    def new_card():

      card = Card(request.data.get('component'), request.data.get('key', {}), request.data.get('data', {}))
      card.save()

      import time
      time.sleep(1)

      return make_response(jsonify(card.serialise())), 200

    @app.route('/api/real/cards/save', methods=['POST'])
    def save_card():

      id   = str(request.data.get('id', ''))
      card = Card.get_all().filter(Card.id == id).one()
      card.data = request.data.get('data', {})
      card.save()

      results = []

      return make_response(jsonify({ 'list' : results })), 200



    @app.route('/api/real/cards/<id>', methods=['GET'])
    def get_card(id):

      cards = Card.get_all().filter(Card.id == id).all()

      results = []
      for card in cards:
         results.append(card.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/real/favourites/clear', methods=['POST'])
    def clearfav():
        userid = request.data.get('userId', '0')
        Favourite.delete_all(userid)
        return make_response(jsonify({'status': 'ok'})), 200


    @app.route('/api/real/imports/countries', methods=['GET'])
    def import_countries():

      with urllib.request.urlopen("https://raw.githubusercontent.com/iancoleman/cia_world_factbook_api/master/data/2018-05-28_factbook.json") as url:
        data = json.loads(url.read().decode())

        for country in data['countries']:
          country = Country(data['countries'][country]['data'], {})
          country.save()
          #print (data['countries'][country]['data']['name'])

        return make_response(jsonify({'status': 'imported'})), 200


    return app


