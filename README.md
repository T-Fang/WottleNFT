# WottleNFT

![WottleNFT](https://user-images.githubusercontent.com/61874388/142764258-557fed13-5796-406d-ac2c-ed25e86ffe94.gif)

**WottleNFT is a sustainable NFT Marketplace built on the Cardano Blockchain**

Project Homepage URL: https://wottlenft.io

Promotional Video URL: https://youtu.be/8s6AXX16T6Q

![WottleNFT-Poster](https://user-images.githubusercontent.com/61874388/142764335-cb322cb9-9992-4d1e-80dd-cf3b86161762.png)

# Description

WottleNFT is a Cardano NFT marketplace. It serves as a platform for collectors of NFTs on the Cardano blockchain to trade their NFTs efficiently and with low transaction costs. It also boasts an easy-to-use NFT minting page, where users may mint their very own NFT on the Cardano blockchain straight from the browser.

Importantly, the core of WottleNFT’s marketplace is its focus on supporting humanitarian efforts. Every trade on the WottleNFT marketplace will contribute towards the United Nations Sustainable Development Goals (SDG) - when a user chooses to list his/her NFT on the marketplace, he/she will be prompted to select a UN SDG to support. Currently, users may choose between 3 SDGs to support: Zero Hunger, Climate Action or Quality Education. When the listed NFT is successfully sold, 1% of the transaction will be donated towards the selected UN SDG. That way, the popularity of NFTs can be harnessed to do good, in the form of raising money for meaningful causes. 

## Our Story

Here at WottleNFT, we aim to bring out the true value behind each Cardano NFT by providing a space for the Creators to share their stories. It is also important to give back, especially with the outbreak of the Covid-19 Pandemic. That is why, WottleNFT will be aligning its business model with the United Nation Sustainable Development Goals (SDGs) to support Social Enterprises worldwide. Furthermore, we are empowering you to support them! With every transaction made on WottleNFT, you get to choose which of the UN Goal to support. For now, WottleNFT is focusing on 3 UN Goals : Zero Hunger, Climate Action and Quality Education.

## Our Focus

WottleNFT focus is to help the whole of Cardano Community better determine the appropriate prices for each NFT by creating a Cardano Marketplace that is story focused, details centric and community driven. We believe that price is only what you pay; value is what you get.

## Marketplace

WottleNFT will first focus on building an amazing marketplace. Afterwhich, we aim to integrate Cardano Smart Contracts by December. Listing is FREE*. You just need to pay ~2₳ : 1₳ pegged to your NFT and ~1₳ for transactional Fee. Upon successful sale, we charge a 3% fee, with a minimum of 2₳ for each transaction. This fee comprises: Service Fees (1₳,2%) and Social Donations (1₳,1%). If you are a successful buyer/seller, head over to the profile section to choose one of the 3 UN Goals to support : Zero Hunger, Climate Action or Quality Education

## NFT Minter

WottleNFT wants to make Cardano NFT as easy and as accessible to everyone. As such, we have implemented a whole new in-browser experience that offers the lowest minting service fee in the market. Mint 1 Cardano NFT for 1 ADA in just under 1 Minute with our very own Nami Wallet enabled NFT-minter.



# CS3216 Final Report

**WottleNFT**

Tan Kang Liang | Let Yan Wen Dominic | Aloysius Lim Dewen | Tian Fang


# Description

WottleNFT is a Cardano NFT marketplace. It serves as a platform for collectors of NFTs on the Cardano blockchain to trade their NFTs efficiently and with low transaction costs. It also boasts an easy-to-use NFT minting page, where users may mint their very own NFT on the Cardano blockchain straight from the browser.

Importantly, the core of WottleNFT’s marketplace is its focus on supporting humanitarian efforts. Every trade on the WottleNFT marketplace will contribute towards the United Nations Sustainable Development Goals (SDG) - when a user chooses to list his/her NFT on the marketplace, he/she will be prompted to select a UN SDG to support. Currently, users may choose between 3 SDGs to support: Zero Hunger, Climate Action or Quality Education. When the listed NFT is successfully sold, 1% of the transaction will be donated towards the selected UN SDG. That way, the popularity of NFTs can be harnessed to do good, in the form of raising money for meaningful causes. 


# Competitor Analysis


## CNFT.io

CNFT.io is a Cardano NFT marketplace that utilizes a traditional backend data storage to keep track of listed NFTs and to handle transactions. This means that users on CNFT are required to create an account with them in order to purchase or list their NFTs, and all this information will not be publicly available. 

We believe our application is more appealing to users due to our use of Nami Wallet, which allows users to handle all the application needs within their browser without the need to navigate to other sites or mobile applications in order to handle payment. We have also replicated the smart contract functionality with our escrow style marketplace that halves the number of transactions, thus, halving the transaction fees incurred. 


## Discord Marketplaces

As the Cardano NFT space is relatively new, Discord marketplaces have become a common avenue for people to buy and sell NFTs. These Discord channels come from NFT drop artists or even official Cardano developer channels. However, most transactions here are handled manually with the seller sending the NFT and the buyer paying afterwards or vice versa. While it is possible for both to be combined in a single transaction, Discord will not be able to provide any support for this. This opens up the possibilities for scams to take place. Furthermore, advertising your NFT is hard when Discord cannot automatically look up the NFT details and image to display it for everyone to see and a third party site like pool.pm usually has to be used. 

WottleNFT solves this by introducing an escrow marketplace where we hold listed NFTs and buyers will get them directly in a single transaction. Not only do sellers have an avenue to showcase their NFTs, they can also publicise the link directly where all NFT information will be fetched and anyone can view their NFT’s details. We act as a middleman to install confidence in both parties and facilitate their transactions, all within the comforts of their browser.


## OpenSea.io

OpenSea.io is an Ethereum NFT marketplace. The biggest difference would be the blockchain used, Ethereum vs Cardano. While Cardano has a much smaller user base compared to Ethereum, it provides lower and more predictable transaction fees. This will allow collectors and traders to more reliably estimate their costs and earnings. As previously mentioned, the Cardano space is also relatively new, where there is not only a lack of NFT platforms, but also a lower barrier to entry for newer players in the NFT space to get in and market themselves. As such, we have chosen to build our platform on the Cardano blockchain as this allows us to not only fill the gap in this new space, but also become an early adopter and ride the wave of a growing blockchain.


# Milestone Review

<span style="text-decoration:underline;">Milestone 1</span>

Set up landing page (Achieved)

Set up About page (Achieved)

Set up Minting Service (Achieved) \
Set up Nami Wallet Integration (Achieved)

Research on Smart contracts and create an auction script on Plutus Playground (Not achieved and discovered to be unfeasible, pivoted to marketplace and transactions handled on our end)

In this milestone, we built the basic structure of the webpage and the overall feel and touch of our application. We also set up some basic services such as NFT minting. However, we did face difficulties with regards to smart contracts. Fortunately, we identified the issue early and decided on a workabout around it.

<span style="text-decoration:underline;">Milestone 2</span>

Set up profile backend API (Achieved)

Set up profile page (Achieved)

Set up Marketplace (Achieved)

Set up Listings (Achieved)

Set up buying and sell on Marketplace (Achieved)

Set up individual NFT viewing (Achieved)

In this milestone, we mostly focused on completing the features of our application and to get it up and running. Overall, we were able to achieve our goals in time for our launch on milestone 3.

<span style="text-decoration:underline;">Milestone 3</span>

Launch marketplace (Achieved)

Get User Feedback (Achieved)

Created promotional content (Achieved)

Did Advertising (Achieved)

Prepared for steps (Achieved)

In this final milestone, we have successfully launched our application to real users. We also gather feedback along the way and tweak our UI and UX a bit from the feedback. We then focused more on marketing and advertising to attract more users to use our application and to gain exposure. We also prepared for the STEPs presentation.


# Contribution & Roles

<table>
  <tr>
   <td>Kang Liang
   </td>
   <td>
<ul>
  <li>NFT Minting blockchain functionality 
    <li>NFT Marketplace blockchain functionality

<li>Frontend development

<li>Deployment

<li>User testing
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>Aloysius
   </td>
   <td>

<ul>


<li>Profile backend API

<li>Database and schema design

<li>User testing

<li>Smart contracts research
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>Tian Fang
   </td>
   <td>

<ul>



<li>Frontend development 

<ul>



<li>Navigation bar, Footer, Side Menu

<li>Responsive Design of various web pages

<li>Landing page (before marketplace launch)

<li>Marketplace

<li>Individual NFT pages

<li>Partners and social enterprises pages
</li> 
</ul>

<li>User testing
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>Dominic
   </td>
   <td>

<ul>



<li>Frontend development

<li>Research into IPFS

<li>User testing
</li>
</ul>
   </td>
  </tr>
</table>






## External Party (WottleNFT)

For the project, WottleNFT has provided us:



1. Graphic assets for the website
2. Bare-metal servers for deployment
3. ADA funded wallets for testing

We constantly communicate with the main WottleNFT team via both Telegram and Discord, so that everyone is updated on the progress. Additionally, full team meetings are held fortnightly, so that everyone can meet (virtually) and “formally” update each other on each team’s progress. 

In addition to full team meetings, we have a similar fortnightly sprint meeting with the WottleNFT core team where we map out the tasks to be completed for the upcoming sprint. During these sprint meetings, the core team provides a general direction of where the project should be headed while our team gives input on what user research / development work / marketing effort needs to be completed within the sprint. For example, in our first ever sprint meeting, their goal was to launch with an auction site but we advised their team on having a safer prototype while we conducted more user research. This got us to the idea of a simple NFT Minter that we were able to easily test and market to users on various platforms like Discord/Reddit. Our frequent discussions with WottleNFT also let us propose a new target group, specifically NFT drop artists who need help minting and selling their NFTs ([https://nftcalendar.io/](https://nftcalendar.io/)), which has led to the team reaching out to these groups and securing a first client to mint 5000 NFTs at 1.5 ADA each. During these meetings, we will also split the tasks amongst ourselves as well as request help from the core team regarding sourcing of users for user testing.

For compensation, after some negotiation with the founder of WottleNFT, we came to an agreement of an option between $1000 (with an additional $500 with each successful funding that WottleNFT receives) at the conclusion of CS3216 or 5% equity if we choose to stay on afterwards. 


# Application Design


## Blockchain

All work on the blockchain has to be queried from or submitted to the Cardano Node, which is responsible for communicating with the many other nodes that make up the Cardano Blockchain. To interact with the blockchain, we use a few tools that help with the querying and submission of data onto the blockchain. 



1. cardano-node
    1. Responsible for communication with other nodes
2. cardano-submit-api
    2. Submits transactions in CBOR to the cardano-node
3. cardano-db-sync
    3. Dumps all data from the cardano-node regarding transactions into a PostgresQL database
4. Blockchain Backend
    4. Handles logic for building transactions to be submitted to the blockchain
    5. Provides a RESTful API for our frontend to interact with
    6. Provides interoperability with Nami Wallet

![img](https://lh5.googleusercontent.com/j126cxd7HbCzVYKR-Gq_OsxNm4LLLCsYoWUD5OdhI76K5CDbiIyjGhFNWD9WeUE2t8A2so37fbefSgWxMlX-WoS1EzdXMakiP735eeNLaLYzRQQzB9AYRt_j65MRiqWLwY2fVmuG)

## Profile backend

All user information and transactions that happened within our marketplace as well as the NFTs that we are currently holding are listed here. This part of the service is written with Typescript on Node.js together with PostgreSQL. 

The schema contains 2 main objects: Accounts and Listings


### Accounts



* Username
* Wallet id
* Password
* Email
* Bio
* The hash of the profile picture
* The hash of the profile banner
* The associated UN Goal


### Listings



* Listing ID
* The ID of the listed NFT
* The name of the listed NFT 
* The buyer’s wallet ID  
* The seller’s wallet ID 
* The price in ADA
* The metadata of the NFT
* The current status current_status 
* The seller contribution in ADA to UN Goal
* The buyer contribution in ADA to UN Goal
* The listing creation timestamp
* The bought or cancel timestamp
* The associated UN Goal

Then, multiple API endpoints are provided for the Frontend to consume and store the data. Some preprocessing is also done here to get the information packaged in a way that the frontend can read.

Generally, the purpose of this is to hold some information on our end that we are unable to store directly into the blockchain and also for data analytics. We also keep track of various hashes and identifiers in here so that should the need arise, we can query them from the blockchain to obtain the full information. Ultimately, the information here is mainly used for our consumption and for the functionality of our application such as WottleNFT’s user profiles etc. while financial transactions are still ultimately stored in the blockchain where it is secure and transparent.


## Frontend


### Nami Wallet 

Users of WottleNFT interact with the Cardano blockchain via a third-party browser extension, Nami Wallet. Thus, we have to make sure that the frontend application design of WottleNFT supports the use of the Nami Wallet extension. This has implications on authentication design on the frontend of our application.

Nami Wallet provides an API that allows the frontend of our application to retrieve information from the user’s Nami Wallet extension by interacting with the browser. In order to reduce the number of such API calls and keeping in mind that information about the user’s Nami Wallet extension would be needed across many (React) components, we retrieve and store Nami Wallet’s cardano provider object as a redux state, such that we may retrieve information about the extension and interact with it without making repeated queries to the browser across components.

Integrating Nami Wallet with WottleNFT also required some decisions on the design of profiles and authentication. To keep it simple, we decided that each profile that a user creates on WottleNFT must be tagged to a particular wallet, specifically, a wallet address. In order to enforce this, we decided on the following pattern for authentication on the frontend: At first instance, the user must first connect their Nami Wallet extension to WottleNFT. Once the application detects that Nami Wallet is connected, the user may create an account/login with the connected wallet’s address. The application automatically detects and attempts to login using the connected wallet’s address:

![img](https://lh6.googleusercontent.com/x3DtTyRz9y-gN5enFpvu1he-EZW3HrI1xdJS4hA9d3ZWtIEAuJUQe23gYzv0o5EChyGz5LCpavKqm5Fp-6QPl9ierux9XyIhU2pYiqb43p1rHN6tYYChkGafto7pSSpcsj3tMJ-J)


We think this is the optimal way to deal with authentication while incorporating Nami Wallet. Logging in with the connected wallet address not only enforces that each account is tagged to a wallet address, it also reduces the number of information that the user has to remember to log in. Since a unique user can be identified by his unique wallet address, there will be no need for the user to login with a username or an email address. This makes logging in to our application easier, eliminating problems such as the user forgetting his username or email used to register. 


### NextJS

To enable server-side rendering, we have opted for NextJS, a framework built for React web application. Server-side rendering is crucial as we want to have search engine optimization (SEO). With proper metadata injected into our website, WottleNFT can appear in search engine results, and people can share NFTs with their friends with description and preview of the artwork.

![img](https://lh5.googleusercontent.com/adWhEFJjiW1z1EJ3fTVKMqrHoevaz7nJYKEZVtfGP37AJ10XNQd_z6u8uNM44uvmdP0TrgDKNeGz_dJMQqYFKba8tIjv-KZoqg1-NynUH9L_Mv3xMy2YWcZ_O816BcuWNar9QPQN)

![img](https://lh4.googleusercontent.com/laYRCJ3xZ_XNfDkhPGmZJgjjQQhnW-LbHsFGuMjNxI85eJzk1rSZivG0cjSbAI7KDvnfkWS_6p9rLIcmH9jbQ7z0ulvx8dsAHochgjdST-02piuXNYuKRnBvOseemp5NM7Y8vof0)


NextJS comes with other nice features as well, such as optimizing image loading and linking different web pages of our website. As a result, our website is very responsive and no refreshes are needed between our web pages. In other words, it makes WottleNFT a smooth single-page application (SPA).



# User Analytics

Currently, 1.4k users have tried our app with an average engagement time of 1m 12s. 

![img](https://lh3.googleusercontent.com/IvmRk2A5mtS0ij0m-4YIPH-3YfnC_X6TFIjGNyk7m-L5I2hrkKVtVY4VM7_MMBMwD3kC6llAH99wcU8_ZENn8nlLXFnH6rRdQNcqeP8cpmJkHdneHikTcy6OU1sNKSQKUJZEl5md)![img](https://lh4.googleusercontent.com/6w8LJDgeye9bsb7LXqwbJY_wCqKmOxpLK8MWptRz_kTaG9t8wVOKJ2lBzUMeEoBhCpCo3RidE1OtkO4O0uDY8bp0jaaRCh15lMlHJDgJuGmQyBT2ILc9pbZZmkD2T7p-hPtfZPsv)



There are over a hundred active users for the past 7 days.



![img](https://lh4.googleusercontent.com/tWqMsSz_UN-n9sm5vx2CatBTlgsrenp1qW2ap1AJSi3XqvH6pbVDKAV_4vRS8hJURk3LBUj6rPNC3-qYU0fL4oRyZ6XKDC0IHUf3pYSOXXFV3IuOjvw0wzPc9qrbehCPDDjodxz7)![img](https://lh4.googleusercontent.com/2Cb2t0QWModj4pomSDlMCHQhGGI4x8NdwxUGWbeGkVuCFpOMzbBmZ-AGSpIQjMTh3pYpDWpaym8oAblG3DuJI7JLyHcdQCmlDxeCHQ3609HoD5gz9d7ief15eT6PtNCMdyUm1Gsd)
In terms of social media followers, we currently have 200 followers on Discord, 109 followers on Instagram and 167 followers on Twitter and the numbers continue to grow. 

![img](https://lh6.googleusercontent.com/LcnAdAoT5ZE9Gl_EFy5vbK2vkcmkLr0kXO4hioYxTUlTIpb1BCWCFuCpABTjbv26WCMW68Xekw7xXhSZlfjT09uCtAeJ2klRGBp8mFL6DE13yJIXNGXdetw4F52hiKI9mny1TSYO)


We have recently sold our first NFT minted on our website for 50 Ada (around SGD$150), which is very exciting.

![img](https://lh6.googleusercontent.com/r4LmfLLcUknACYlTkp6hA9wUJOH4UmpwMah_-b1zs3eQsiYcsEs8HJGU56C8n43oFkElavPzM0i5ewRE6YRvN0QhChnXF6uXoeuBA_pE5obkF84BEQQik8thSDrd9Y-pOv3YLJz8)


 In addition to this, our marketplace has generated a total of 26 listings / sales in total.

![img](https://lh3.googleusercontent.com/Y1CG0JY1Y0Ho8VJN_Ll2C3k-Sta-RC11CVM_NpM58C7K_RBM_fWGQLEgeP8AEE4RhbJcAQ5OixF5tzqMBPYnEeNLzKIWPwRhdeXRlIJSlaYU4wBBn62n7EBxk9qcEe9wJHg_aiCi)



# Future Plans & Strategies

WottleNFT is a fully-functional product, but there is still room for improvement. The team plans to improve the user experience by adding a search bar with filters to allow ease of navigation. This new feature would allow users to search for their interested Cardano NFT in the marketplace, increasing accessibility. We aim to push out this feature by the end of the year to keep up with the competitors.

WottleNFT has recently secured a deal with an artist to help mint a batch of 5000 unique Cardano NFTs and facilitate the whole process from minting to listing. The team plans to implement a new feature on WottleNFT to cater this service to interested artists who want to mint more than 1 NFT at one time. The team aims to push out this feature by the second week of December. This not only provides an additional revenue for the team, but also helps with WottleNFT’s marketing as such artists would be promoting their art to be sold on WottleNFT.

WottleNFT has also secured a collaboration with TRCL to facilitate an art festival from the 13-19th December. There are an estimated 200 art pieces to be sold, where TRCL will be minting all the art pieces. After which, the auctions would first take place on TRCL website before facilitating transactions on WottleNFT for the successful buyer. Concurrently, WottleNFT will be exposed to media and news coverage which would improve WottleNFT’s outreach. 

In the first quarter next year, the team aims to work on smart contracts for WottleNFT, which is important to make WottleNFT a decentralised marketplace. Thereafter, the team will be working on implementing auction smart contracts to increase WottleNFT’s services.


# Insights


#### Tian Fang

Communicate with teammates as soon as possible when there is a problem. I am glad that I have a very supportive team, to whom I can safely express my concerns and challenges faced. For instance, I sent my computer for repair and I was not able to edit the 1 min video for STEPS. After I shared my situation, more than 1 teammate offered help and I really appreciated it. Similarly, I tried to help when someone else was having some issues such as taking Kang Lang’s role at STEPS presentation as he could not make it. Effective and timely communication prevents small problems from growing into bigger ones. And I’m really grateful that we have such an amazing and comfortable development environment.


#### Aloysius

I have learnt many things from this project. First is of course a better understanding of cryptocurrencies, blockchain and NFTs in general. I learnt about various technologies such as smart contracts as well. I am fortunate to have a supportive team that is willing to help whenever there is a problem. Each individual is knowledgeable about their part and was able to complement each other’s skillset. I also get to work with various non technical people such as artists and designers to build the application together and learn many other important aspects when it comes to developing a product such as advertising and marketing from them. Overall, everyone was rather chill and it was a great experience.


#### Kang Liang

Working on this project has allowed me to learn a lot more about the blockchain space, whereas previously my only knowledge of them was through cryptocurrencies. I have also learnt a great deal regarding the importance of team management, where we conducted multiple meetings and tried to set achievable goals to complete. Although new tasks kept popping up closer to the deadline, I had a great team that was able to react quickly to add in new features, fix bugs or even just communicate new issues that come up. It is exciting to work on something that is being used and paid for by actual users and then brainstorming on which area of advertising, marketing or research to focus on next to secure the next users. Overall, I have learnt a great deal regarding the development of a product and am grateful to have worked with talented individuals in the process.


#### Dominic

One of my main takeaways from the project is working with IPFS. During the course of developing the platform, I had to experiment with different ways of storing a resource on IPFS, namely, using a third-party pinning service and running an IPFS node locally. Problems that we encountered on the way with storing the IPFS URI also gave me the opportunity to research into the different types of content identifiers that IPFS uses. Overall, this project allowed me to gain a basic understanding of IPFS and learn how to work with IPFS, whether by running a node locally or using a third party pinning service (like pinata or NFTstorage).

Of course, this project also allowed me to gain a basic understanding of how blockchain works. Even though my contribution in this project was primarily in the frontend of the application, a basic understanding of blockchain concepts was necessary, and I am thankful that this project not only forced me to do my own research into the topic, it also provided me with the opportunity to clarify certain things that I did not understand along the way. 
