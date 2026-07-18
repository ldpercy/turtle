Examples
========



Flowers
-------

```
right 72,400
ellipse 400,200
left 72,300
ellipse 400,200
right 180,300
left 72,300
```

```
^left 20,800
^right 175,300
ellipse 125,900
^left 80,700
ellipse 250,750
^xy 0,0
```

```
right 115,200
ellipse 700,200
left 85,400
ellipse 600,200
^xy 0,0
```

```
// command set 3
left 25,200
left 65
ellipse 900,200
^xy 0,0
right 120,200
right 60
ellipse 900,200
^xy 0,0
right 110
```
```
// command set 3
^left 25,200
^left 65
ellipse 900,200
//^xy 0,0
left 115,200
left 125, 200
right 60
ellipse 900,200
//^xy 0,0
right 115,200
//^right 110
```



Testing
-------
```
right 60,600
//right 72,400
left 72,200
circle 100
marker
right 180,200
left 72,400
```



Bicycle spoke patterns
----------------------

Where the two turns add up to 360



```
right 110,1800
left 250,700
```
right 120,1800
left 240,700

right 110,1800
left 250,800

right 80,1400
left 280,1200

// 12 sided
right 105,600
left 255,1400


Actually equal turns a bit of over 90deg is better:
right 110,200
right 110,1400

right 130,200
right 130,1400



What's the angle?
-----------------

### Mystery angle:

Something weird going on with these - not sure if bug:

// command set 1
left 99.30133,999
left 55,555

left 100,1000
left 53.3333,800


The mystery angle is derived from 30 divided by 7 = 4.285714

	left 100,1000
	marker
	left 54.285714,600
	marker

The paired lines aren't parallel, even though they look like they should be.