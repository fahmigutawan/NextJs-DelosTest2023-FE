# Welcome to DelosNews Repository

**DelosNews** is a website that provides premium article to users around the world. This website is developed in order to complete Delos FrontEnd test.


# Tech Stack
Technologies I used to develop this website are:

 1. NextJs with Typescript
 2. Supabase to be the database services
 3. Jest to be the testing library

# How to Use this Repository
If you want to edit or modify this repository in your local environment, you have to type this first:

    npm i
    
To use this repository, you just have to type:

    npm run dev
	# or
	yarn dev
	# or
	pnpm dev


# Pages
 1. **/login**
 2. **/register**
 3. **/home?page=...**
 4. **/detail?id=...**
 5. **/profile** (You can navigated into here by clicking profile picture icon at top-left of your home page)
 6. **/owned_article**
 7. **/lucky_draw**

# Features 
 - You can login and register, then connected to Database.
 - You can get articles that grouped by page
 - You can really buy premium articles

# * Things to Know

 - All items have been provided online in Supabase. If you noticed lot of things are the same, is because of my limitation of creating dummy data :)
 - If you type **/home** without any page query, it will not display any items from default page (i.e page=1). Because I still have not handle it.
 - If you look at this repository architecture, you will see **"ApiSource"** class. It's because I was trying to make a real BackEnd with Ktor, but I discouraged because deploying Backend was going to be another issue that I was not focusing at. 
 - All page requirement have been provided, except filtering. Probably i would update this filtering soon, because i've knew the flow in my head.
