from app import db
from app.user_models import User

from sqlalchemy import Text

from sqlalchemy.dialects.postgresql import JSON, JSONB

class NYPD(db.Model):
    __tablename__ = 'nypd'
    cmplnt_num  = db.Column('cmplnt_num', db.Integer, primary_key=True)
    boro_nm  = db.Column('boro_nm', db.String)
    ofns_desc  = db.Column('ofns_desc', db.String)
    longitude = db.Column('longitude', db.Float)
    latitude = db.Column('latitude', db.Float)

    @staticmethod
    def get_all():
        return NYPD.query

    def serialise(self):
        return  { 'longitude' : self.longitude, 'latitude' : self.latitude }

class Store(db.Model):
    __tablename__ = 'store'
    id =  db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String)
    type = db.Column('type', db.String)
    longitude = db.Column('longitude', db.Float)
    latitude = db.Column('latitude', db.Float)

    def save(self):
      db.session.add(self)
      db.session.commit()

    @staticmethod
    def get_all():
        return Store.query

    def serialise(self):
        return  { 'id': self.id, 'name' : self.name, 'type' : self.type, 'longitude' : self.longitude, 'latitude' : self.latitude }

class PageCard(db.Model):
    __tablename__ = 'pagecard'
    id =  db.Column('id', db.Integer, primary_key=True)
    pageId = db.Column('pageId', db.Integer, db.ForeignKey('page.id'))
    page = db.relationship("Page")

    userId = db.Column('userId', db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User")

    component = db.Column('component', db.String)
    enabled = db.Column('enabled', db.String)

    def save(self):
      db.session.add(self)
      db.session.commit()

    @staticmethod
    def get_all():
        return PageCard.query

    def serialise(self):
        return  { 'id': self.id, 'component': self.component, 'enabled' : self.enabled, 'user' : self.user.serialise() }

class Page(db.Model):
    __tablename__ = 'page'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255))

    def save(self):
      db.session.add(self)
      db.session.commit()

    @staticmethod
    def get_all():
        return Page.query

    def serialise(self):

        cards_json = []
        cards = self.cards

        for _ in cards:
                cards_json.append(_.serialise())

        return  {
                   'id': self.id,
                   'url' : self.url,
                   'cards' : cards_json
                }





class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer)

    component = db.Column(db.String(255))

    key = db.Column(JSONB(astext_type=Text()))
    data = db.Column(db.JSON)

    def __init__(self, component, key, data):
        self.component = component
        self.key = key
        self.data = data

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Card.query

    @staticmethod
    def delete_all():
        db.session.query(Card).delete()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<Card: {}>".format(self.id)

    def serialise(self):

        return  {
                   'id': self.id,
                   'component' : self.component,
                   'key' : self.key,
                   'data' : self.data,
                   'order' : self.order
                }



