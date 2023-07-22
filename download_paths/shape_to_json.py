import shapefile
import sys
import json

shapeFile: str = sys.argv[1]
jsonFile: str = sys.argv[2]

shape = shapefile.Reader(shapeFile)

feature = shape.shapeRecords()

record = []

for shape in feature:
	landMassGroup = shape.shape.__geo_interface__['coordinates']

	for landMass in landMassGroup:
		for coordsGroup in landMass:
			item = []

			for coords in coordsGroup:
				if type(coords) is float:
					continue

				item.append({
					'x': coords[0],
					'y': coords[1],
				})
	
			record.append(item)

json_object = json.dumps(record, indent="\t")

with open(jsonFile, "w") as outfile:
    outfile.write(json_object)
