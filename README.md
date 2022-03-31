# Full_Stack_dev

Application to allow a salesman selling to agricutural industry to track his/her clents via a placemark app. Currently, the sales man can sign up or log in,
add a placemark name, and add details for the placemark such as Farmer name, address details, and enterpise type (dairy,tillage ect.) The salesman can
if he/she wishes, delete a farmer, or delete a placemark name. 

Image can be added to placemark. This would, in an ideal world, need to be modified further to assosiate image with a paticular farm and delete image. Weather 
for each paticualar farm would also be nice to have in there. Further enhancements to make would be, instead of adding a placemark name, to select an
enterprise type from a drop down list (catergories) and then display and add farmers for what ever respective list is selected.
Unfortunalty time ran out to ad dthese features. This way each farm is a placemark in itself which can have weatehr api attached ect. 

In all the assignment is in the lower end of excelent to bring to assignment2. With API at JWT level and Open Swagger API also included are unit tests. The App is deployed
to Heroku, using mongo and cloudatlas as datbases with cloudinary as an image handling service.

I have creteed git branches as went along and came back into main branch, I creeted a branch called masterbranch in the end as had some difficulty 
closing out for heroku. Autdeply is set up now when ever this master branch gets a commit/push. I also created 3 tagged releases as went along, the first 2 releases were
pre heroku and cloudinary implementation.

It is only in the last couple of days I can see the real advantage to the TDD, previously I was feeling teh test set ups were eating too mucg time instead of app
development, whcih is hwy I have not deviated much from the labs. I can see now though the benifit, I delployed code and something did not work, ran the tests
and pointed right at the problem quickly. Of course validating the code can run error free is another advantage to cover various senarios. 


Link For You tube demo: https://youtu.be/k_4Bn9pDQUs
Link For Heroku Deployed: https://quiet-retreat-18754.herokuapp.com




