# server.py
# Jalankan file ini di terminal kalau tidak pakai Live Server
# Caranya: python server.py
# Lalu buka browser ke: http://localhost:8000

import http.server
import socketserver
import webbrowser
import os

PORT = 8000

os.chdir(os.path.dirname(os.path.abspath(__file__)))

handler = http.server.SimpleHTTPRequestHandler

print(f"Server berjalan di http://localhost:{PORT}")
print("Tekan Ctrl+C untuk berhenti")

webbrowser.open(f"http://localhost:{PORT}")

with socketserver.TCPServer(("", PORT), handler) as httpd:
    httpd.serve_forever()