#!/user/bin/python3
"""This scripts start a flask application"""
from flask import Flask
from flask import render_template
from models import storage
import uuid

app = Flask('web_dynamic')
app.url_map.strict_slashes = False


@app.route('/3-hbnb')
def dis_hbnb():
    """Dropdoen for menu of states or cities"""
    amenities = storage.all('Amenity')
    states = storage.all('State')
    places = storage.all('Place')
    cache_id = uuid.uuid4()

    return render_template('3-hbnb.html',
                           amenities=amenities,
                           states=states,
                           places=places
                           cache_id=cache_id)


@app.teardown_appcontext
def teardown_db(*args, **kwargs):
    """It closes the file storage"""
    storage.close()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
