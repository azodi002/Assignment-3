Name: Omid Azodi
Class: CS648
Assignment: Assignment # 3
Professor: Zak Ruvalcaba
Ensure to run server and dynamically see changes run:
npm start (on one terminal) npm run watch (on another terminal)

Can also go to http://localhost:3000/graphql to ensure data is there through a query

Try the below one and see results when stuff is stored

query {
  productList{
    id
    category
    product_name
    price
    image_path
  }
}