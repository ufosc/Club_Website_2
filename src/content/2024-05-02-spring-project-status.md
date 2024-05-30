---
slug: "/2024-spring-project-status"
date: "2024-05-02"
title: "Status Report: Spring 2024 Projects"
author: "Daniel Wildsmith, Rebecca Weinstein"
featuredImage: ../images/blog/2024-05-02-spring-project-status.jpeg
subtitle: Project Status Description
---
While the coding may be casual, the results are not. We had six official club projects being worked on throughout the Spring 2024 semester.

Every semester starts with a Pitch Day meeting, where anyone can propose project ideas. The club votes on these, and the selected projects have Technical Leads to help guide students through the process and provide tasks. In January, the club voted to continue working on improving this website with the <a href="https://github.com/ufosc/OpenWebServices">Open Web Services</a> project, while making progress on <a href="https://github.com/ufosc/SwampScheduler">Swamp Scheduler</a>, <a href="https://github.com/ufosc/OSC-Proximity-Chat-App">Echologator</a>, <a href="https://github.com/ufosc/manim-data-structures">Manim</a>, and <a href="https://github.com/ufosc/VisualNovel">Bytes of Love</a>. We also finally introduced a long-running project proposal into our repertoire with building an unethical <a href="https://github.com/ufosc/Alarm-Clock">Alarm Clock</a>. It’s been the most proposed project idea for the past four semesters and received enough of the popular vote to have a team dedicated to helping students wake up in 2024.

## Alarm Clock
Github Repository: <a href="https://github.com/ufosc/Alarm-Clock">Alarm Clock</a>

Where waking up means serious business.
The goal with Alarm Clock is to provide users with the ability to configure various punishments for not waking up and implement innovative methods for detecting if a user is awake, thereby promoting better sleep habits and ensuring timely arrival to classes. Starting this semester, basic functionality was implemented using React Native.
"Currently the user can create an alarm and choose the date, time, and sound. Once an alarm goes off, a background notification is sent to the user’s phone," said Kaniel Vicencio.
Of course, the real fun will begin in the Fall semester as this group begins to get creative with the punishments for not waking up on time… We are open to any and all suggestions.

Technical Leads: <a href="https://github.com/kanielv">Kaniel Vicencio</a>, <a href="https://github.com/MaximilianMeiler">Max Meiler</a>

## Bytes of Love
Github Repository: <a href="https://github.com/ufosc/VisualNovel">Bytes of Love</a>

![Bytes of Love artwork](https://i.imgur.com/BqhkVp3.jpeg)

A visual novel to help new programmers learn about various languages and frameworks in a fun way, which is by far the most popular project worked on this semester by members of the club.

"The first arc of Bytes of Love is almost done! Players will soon be able to play through all of the orientation which includes exciting interactions with all the main characters, heated arguments, and funny situations,” said Wilson Goins.
Moving forward, Bytes of Love hopes to finish a whole semester’s worth of gameplay for people to experience and learn the different coding languages.

Technical Leads: <a href="https://github.com/WilsonGoins">Wilson Goins</a>, <a href="https://github.com/RyderKeeny">Ryder Keeny</a>, <a href="https://github.com/nickv779">Nicolas Valiente</a>
Artist: <a href="https://linktr.ee/passionfruitstudios">Tyra</a>

## Echologator

Github Repository: [Echologator](https://github.com/ufosc/OSC-Proximity-Chat-App)

Talk to the people closest to you. An open source React Native app that combines location and communication into one. This project was another club favorite this semester with some of the most activity: over 100 commits!

"We were able to create a working version of our location based messaging app. It currently has user authentication, location based messaging, and some basic settings,” said Alexander Wang.

Next semester, Echologator’s goal is to finish up some more features and clean up latency.

Technical Leads: <a href="https://github.com/h1divp">Phoenix Gutierrez</a>, <a href="https://github.com/AlexanderWangY">Alexander Wang</a>, <a href="https://github.com/doigdaniels">Cameron Daniels</a>

## SwampScheduler

Github Repository: [SwampScheduler](https://github.com/ufosc/SwampScheduler)

![Swamp Scheduler Design](https://i.imgur.com/o86M0TV.jpeg)

The future of scheduling is here. An open-source web app developed to help students at the University of Florida plan for classes next semester.

"Swamp Scheduler finalized a design that will allow students at UF to easily create the perfect schedule based on their needs and wants as students. Lots of consideration went into adapting features and design principles from other similar scheduling systems," said Brian Nielsen.

To try using Swamp Scheduler to help make your Fall 2024 schedule, it’s available now!

Technical Leads: <a href="https://github.com/RobertConde">Robert Conde</a>, <a href="https://github.com/bnielsen1">Brian Nielsen</a>

## Manim
Github Repository: [Manim](https://github.com/ufosc/manim-data-structures)

A plugin that contains common data structures to create Manimations.

This semester, the team worked on animating the tree operations and added a binary heap tree data structure.

“We also worked on understanding how the Manim library handles animations at a lower level,” said Jonathan Levy.

Technical Leads: <a href="https://github.com/levyjonathan31">Jonathan Levy</a>, <a href="https://github.com/Nikhil-42">Nikhil Iyer</a>

## OpenWebServices
Github Repository: [Open Web Services](https://github.com/ufosc/OpenWebServices)

![OpenWebServices](https://camo.githubusercontent.com/e53874c4b9cc4cede079ee1929408379d58399916525f0d6b388f117e5378116/68747470733a2f2f692e696d6775722e636f6d2f5370615a356a322e706e67)

OpenWebServices is the UF Open Source Club's Microservices project. It currently implements a custom OAuth2 server, SMTP relay, and account management dashboard. It hopes to establish a common set of developer and project infrastructure services for use across all of OSC’s projects. All microservices integrate with Kubernetes.

A <a href="https://pkg.go.dev/github.com/ufosc/OpenWebServices@v0.1.0/pkg/authmw">Golang package</a> was developed to enforce authentication restrictions, ensuring only authorized access. Additionally, an OAuth2 client creation API was implemented, enabling users to easily generate their own clients via a user-friendly form on the OWS website. Admins now have a convenient dashboard to manage user and client access permissions. To support users further, a dedicated documentation page has been launched at <a href="docs.ufosc.org/docs/ows">docs.ufosc.org/docs/ows</a>. Now, efforts are underway to finalize a metrics service that will monitor system usage and visitor counts across all OSC projects.

Technical Lead: <a href="https://github.com/zeim839">Michail Zeipekki</a>

## Conclusion

We hope everyone has a great summer break and stay tuned for the Fall 2024 semester’s Pitch Day to have your project ideas heard! Thanks to our Tech Leads for helping to make these projects and to our open source community for casually coding every week with us.
