# PagingTable

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

## steps to run the project

1. npm install
2. ng s
3. Navigate to `http://localhost:4200/`




A few words about the project ...

I was looking for a fake API that could meet the requirements (in the DUMMYAPI you attached I did not find an option for an API that does SEARCHING,
although I sent an email on the subject, I did not find this API in DOCS, therefore I used https://mockapi.io/docs).

There were a number of gaps I had to bridge,
In order to display certain columns, I created another unused column in the API, and filtered it on the FRONT side.

Because this API does not support PAGINATION, I saved pagination data locally.

paginator info:
---- max available items is 100 (this api does not support to send more).
---- limit is 20

Also, in INFINITE SCROLL, I did not understand the requirement to display the new data at the top, when a user scrolls down (as on Facebook), 
the data is added from below and not from above, functionally there is no difference for me, I can implement both in - infinite-table.component.ts line 73.

If you still feel that I did not understand one of the requirement and / or you would like me to correct it, please write to me.



ENJOY!

"# TablesTypes" 
