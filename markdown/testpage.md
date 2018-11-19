<!---DOC:Test page;A bunch of experiments for testing the capabilities of showdown;Sean Lewis-->
# Test page

## Here is an image

![An image](./images/test.jpg)

## Here is some text!

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque semper pharetra metus, vestibulum laoreet nisi. Integer ullamcorper magna lacus, ac tempor diam venenatis a. Vestibulum congue odio non varius luctus. Cras et efficitur augue, eu fringilla ipsum. Aliquam fermentum est odio, eu porttitor est viverra congue. Donec vestibulum vulputate urna. Curabitur scelerisque viverra dolor, in aliquam mi. In hac habitasse platea dictumst. Pellentesque vitae elit hendrerit, suscipit arcu in, porta urna.

Nunc vitae nibh urna. Fusce at consectetur justo. Sed fermentum viverra lectus sed viverra. Cras in efficitur nibh. Fusce et nisl euismod nulla consequat vestibulum vitae eu mi. Mauris quis mi nec enim malesuada consequat et eu massa. Vestibulum egestas enim mi, ut semper nibh suscipit id. Duis lacinia pretium placerat. Vestibulum hendrerit, urna eu tristique tempus, neque ipsum dapibus libero, condimentum feugiat tellus arcu vitae sem. Curabitur eu dictum libero, nec mattis erat. Integer fermentum nisi nec hendrerit interdum. Integer diam lacus, facilisis at tincidunt sit amet, posuere sed nibh.

Praesent nisl mi, dapibus et leo sed, convallis suscipit risus. Pellentesque ipsum lorem, volutpat vel auctor at, eleifend a odio. Maecenas vehicula justo dui, id congue diam egestas id. Nulla egestas odio metus, vulputate suscipit dolor volutpat et. Suspendisse iaculis dapibus tortor, eu ultricies arcu fringilla et. Nunc mattis neque non scelerisque convallis. Sed dictum tortor nec tortor cursus posuere. Mauris ac quam vitae nunc luctus interdum. Sed at quam purus. Nulla ultricies mauris vel dolor bibendum vulputate. Mauris auctor, purus nec fermentum interdum, leo nisi viverra orci, eu fringilla nisi eros vitae ante. In volutpat fringilla leo, hendrerit venenatis orci interdum ut. Aliquam ut ultrices felis, placerat fermentum ante.

In dictum egestas metus, et hendrerit ex tempor sit amet. Vestibulum tincidunt, erat vitae placerat gravida, ligula tellus ultrices arcu, consectetur viverra dolor dui id lacus. In lobortis mauris ligula, sed ullamcorper dui finibus nec. In finibus nunc sem, et auctor lorem suscipit et. Pellentesque fringilla turpis ac odio semper feugiat. Suspendisse suscipit euismod erat sed rhoncus. Vivamus porta quam lectus. Proin porta dignissim justo ut sagittis. Nulla maximus sapien a enim convallis, a tristique nibh venenatis. Ut id ex tempor, luctus lectus non, ultrices elit. Nullam ultrices eu ipsum vestibulum sodales. Suspendisse a mauris eget dolor tincidunt condimentum. Suspendisse quam purus, lobortis quis neque id, consectetur cursus dui. Phasellus id finibus arcu, eu aliquam massa. Praesent a laoreet velit, eu mollis dolor. Aliquam ex lacus, porttitor in accumsan id, pharetra ut massa.

Donec rutrum ex vestibulum, tristique mauris a, tristique sapien. Integer ac justo lectus. Sed laoreet quam a urna pellentesque luctus. Nulla dignissim mi a vulputate pellentesque. Nulla accumsan, nisl id fringilla tristique, libero enim finibus quam, nec malesuada sapien nunc ac metus. In hac habitasse platea dictumst. In finibus velit ac orci laoreet, vitae accumsan odio viverra. Pellentesque et erat eros. Curabitur viverra elit nec ultricies volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur turpis nisl, pretium ac hendrerit at, auctor et urna. Quisque condimentum dapibus nulla, non dignissim nunc sodales sed. Praesent hendrerit ultricies mauris, ut cursus metus pharetra a. Mauris consequat dapibus auctor. Morbi sit amet arcu felis.

## Here is some example code!

```python
# Imports for app specific functionality
from coffee_app import app
from coffee_app.models import Cafe, Coffee, Tag

# When given the name of a Cafe, either returns the cafe in JSON format OR
# returns a 404 error if one can't be found
@app.route("/api/getCafe/<string:name>")
def getCafe(name):
  result = Cafe.query.filter(Cafe.name == name).first_or_404()
  return jsonify (result.serialize)

# Returns a JSONified list of all of the Cafes
@app.route("/api/getAllCafes")
def getAllCafes():
  # Perform query
  result = Cafe.query.all()

  # Return result
  return jsonify ([i.serialize for i in result])
```
