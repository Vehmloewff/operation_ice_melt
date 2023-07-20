# Map

A map is a two-dimensional representation of an area. It is represented by a directory of files.

## Tile

At it's core, maps are made up of tiles, each tile representing about 1sq mile in reality. For more information, see the type definition in
`map_types.ts`.

## Tile Groups

Because maps can be quite large, occupying hundreds of millions of tiles, tiles are divided into groups of 1 thousand tiles along both axis,
totalling 1 million. Each of these tile groups is saved as a json file containing an array of it's 1 million tiles. Tiles are ordered along
their rows, from the top-left tile in the group to the bottom right.

Tile group files are always named `tile_groups/<xk>x<yk>.json`, where `xk` is horizontal mile that the group starts at, divided by 1000, and
where `yk` is vertical mile that the group starts at, divided by 1000.

Thus, to find tile `7913,22401`, look at index `9531` in `tile_groups/7x22.json`.

## Meta

Every map contains some basic meta. This describes the size of the map and it's name. For more information, see the type definition in
`map_types.ts`.

The meta is stored at `meta.json` inside the map.

## Map Images

Maps are designed to be able to be quickly rendered to an SVG. To do this, call `getSvg({ x, y, width, height, zoom })`. Note, the lower the
zoom level, the higher the cost of the function.

Maps can also be rendered to a PNG image using the same syntax. This, however, is less efficient, and only works with zoom levels of `1` and
below.

Note: The maximum image size for both SVG and PNG is 6000x6000.

## Zooming

The zoom value is equal to number of square pixels that a tile should take up. For example, `zoom=0.1` will result in 10 tiles taking up the
space of 1 pixel. `zoom=100` will result in 1 tile taking up 100 square pixels.
