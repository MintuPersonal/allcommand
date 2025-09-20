from app import app
import unittest
import json

class FlaskAppTests(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_home(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Welcome to the Flask App!', response.data)

    def test_echo(self):
        test_message = {'message': 'Hello, World!'}
        response = self.app.post('/echo', data=json.dumps(test_message), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.data)
        self.assertEqual(response_data['message'], 'Hello, World!')