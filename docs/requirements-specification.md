##5.0	Software Requirements Specification

###5.1	Introduction

The project shall consist of two parts.  Part one is a public domain website for Alpha Delta Gamma Lambda Chapter at Loyola Marymount University.  Visitors to the site shall be able to learn about the chapter regarding our history, values, and our current operations.  This will be available both through articles and images posted to the site as well as live social media updates from our various platforms including Facebook, Instagram, and Twitter.  Visitors will also be able to donate to the chapter via PayPal from the site.  All static images, text, and articles are to be loaded from a stored database.  Part two of the project is an editing tool available only to select administrators.  Using the tool, administrators will be able to modify the website by changing the contents of the database.  Users of the tool should require no programming experience nor should extensive training with the tool be required.

###5.2	Functional Requirements

####5.2.1	Domain Site Graphical User Interface

#####5.2.1.1	The Graphical User Interface(GUI) for the domain site shall use tabs to access the following pages: home, history, current chapter executive board, newsletter, social media, and donations.

#####5.2.1.2	The GUI for the domain site shall feature live social media updates from Alpha Delta Gamma Lambda Chapter's Twitter, Facebook, and Instagram accounts.

#####5.2.1.3	The GUI for the domain site shall organize the live social media updates from requirement 5.2.1.2 into one live stream of updates.

#####5.2.1.4	The GUI for the domain site shall allow users to directly donate to the chapter PayPal account through a form in the corresponding tab from requirement 5.2.1.1.

####5.2.2	Domain Site Database Storage

#####5.2.2.1	The database for the domain site shall include fields for the following: home page images, home page chapter description, home page description of the 5 S's, a general field for history page articles including fields for an image, title, and description, a general field for exectutive board members including fields for an image, name, year, major, leadership position title, and a description, a general field for a newsletter article including fields for an image, title, date, written by, and description, and an additional field for image history.

#####5.2.2.2	The database for the domain site shall be editable from the editing tool.

#####5.2.2.3	The database for the domain site shall allow administrators to modify all fields in the database.

#####5.2.2.4	The database for the domain site shall store all images saved to the database to be posted to the site in an additional field for image history.

####5.2.3	Editing Tool GUI

#####5.2.3.1	The GUI for the editing tool shall allow administrators access to modify all fields of the database as stated in requirement 5.2.2.2.

#####5.2.3.2	The GUI for the editing tool shall use tabs as in requirement 5.2.1.1 for organization.  There should be the option to view a preview of the site with the proposed changes made in the editing tool.  If not, the GUI should be structured to mirror the current state of the site with additional buttons and GUI layers over it for editing.

#####5.2.3.3	The GUI for the editing tool shall require a log in including a username and password in order to have access to modify the database from the tool.

#####5.2.3.4	The GUI for the editing tool shall use a submit button to submit all proposed changes on the currently selected tab to the database.


###5.3	Performance Requirements

####5.3.1	Loading Time

#####5.3.1.1	Each tab on the site shall load images and text from the database when that tab is accessed.

#####5.3.1.2	All data loaded from the database shall load within less than 1 second.

#####5.3.1.3	If data cannot be loaded within less than 1 second, the data must load in increments as the user scrolls the page.

#####5.3.1.4	All social media updates from the stream should load within 5 seconds of accessing the social media tab.

#####5.3.1.5	If social media updates cannot be loaded within 5 seconds, the updates must be loaded in increments as the user scrolls the page.



###5.4	Environment Requirements

####5.4.1	Development Environment Requirements

####5.4.2	Execution Environment Requirements	

#####5.4.2.1	Both the domain website and the editing tool shall be accessed through the following web browsers: Google Chrome 53.0 and up, Firefox 50.0, Safari 9.1, Microsoft Edge 20.1