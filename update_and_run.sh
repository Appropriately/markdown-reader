# Pulls the latest submodule changes
git submodule update --recursive --remote

# Builds the .json structure for interpreting all the files
python create_structure.py

# Run a command that starts a web application
PYTHON_VERSION="$(python -c 'import sys; print(str(sys.version_info[0]))')"
if [ -x "$(command -v php)" ]; then
    php -S localhost:8000
elif [ -x "$(command -v python)" ]; then
    if [ $PYTHON_VERSION == "3" ]; then 
        python -m http.server
    else 
        python -m SimpleHTTPServer
    fi
else
    echo "There is an issue running a web server."
fi