#!/usr/bin/python3
"""This script starts a flask application"""
from flask import Flask,
from flask import render_template
from models import storage
import uuid
app = Flask('web_dynamic')
app.url_map.strict_slashes = False


@app.route('/100-hbnb')
def display_hbnb():
    """Menu of states/cities"""
    states = storage.all('State')
    amenities = storage.all('Amenity')
    cache_id = uuid.uuid4()
    return render_template('100-hbnb.html',
                           states=states,
                           amenities=amenities,
                           cache_id=cache_id)


@app.teardown_appcontext
def teardown_db(*args, **kwargs):
    """It closes the database"""
    storage.close()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
