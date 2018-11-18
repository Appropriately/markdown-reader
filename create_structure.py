#!/usr/bin/env python
# A file which when run creates a json file based on the markdown folder
# structure, including folders and markdown files.

import os
import json


# Given some information on a file, output the information as a json object
def output_file_json(file, root):
    full_path = os.sep.join([root, file])

    # See if the first line has information on the file
    doc_line = None;
    with open(full_path) as f:
        doc_line = f.readline()

    # Construct the object
    object = {
        "file": file,
        "full_path": full_path,
        "size": int(os.stat(full_path)[6])
    }

    # Handle adding the doc_line params
    if doc_line[:9] == "<!---DOC:":
        documentation = doc_line[9:][:-4].split(';')
        object['file'] = documentation[0]
        object['description'] = documentation[1]
        object['author'] = documentation[2]

    return object


# File walking structure based on code from here:
# https://stackoverflow.com/a/2922878
def directory_to_json(current_directory):
    current, directories, files = os.walk(current_directory).next()

    files_in_directory = []
    sub_directories = []

    for file in files:
        if file.endswith('.md'):
            files_in_directory.append(output_file_json(file, current))

    for directory in directories:
        next_directory = current_directory + "/" + directory
        sub_directories.append(directory_to_json(next_directory))

    json_object = {
        "directory": current.split('/')[-1].capitalize()
    }

    if directories != []:
        json_object['directories'] = sub_directories

    if files != []:
        json_object['files'] = files_in_directory

    return json_object


# Output a file
with open('data.json', 'w+') as outfile:
    json.dump(directory_to_json('markdown'), outfile, indent=2)
