# Mass Assignment Vulnerability Lab

## Overview
This lab is designed to help developers and security enthusiasts understand and exploit mass assignment vulnerabilities in web applications. Mass assignment vulnerabilities occur when an application blindly assigns user input to model attributes without proper validation or filtering, potentially allowing attackers to modify sensitive fields.

## Lab Structure
The lab is divided into two main components:

1. **Client**: A frontend application built with modern web technologies such as React, TypeScript, and TailwindCSS. It provides a user interface to interact with the backend server.
2. **Server**: A backend application built with Node.js and Express. It contains deliberately vulnerable endpoints to demonstrate mass assignment attacks.

## Live Demo

You can try the lab directly without setup:

- Frontend: https://piedpiper-kappa.vercel.app/
- Backend API: https://piedpiper-8ve5.onrender.com/api

## Challenge

Your objective is to exploit the mass assignment vulnerability to escalate privileges.

Try to:

- Create a normal user account
- Intercept and modify requests
- Inject additional fields such as admin-related attributes
- Observe how improperly validated input can lead to privilege escalation

Think like an attacker, but understand it from a developer’s perspective.

## Learning Objectives

By working through this lab, you will learn:

- How mass assignment vulnerabilities occur in real-world applications
- How attackers exploit insecure object binding
- How privilege escalation can happen through simple payload manipulation
- Mitigation strategies such as:
- Input validation
- Field whitelisting/blacklisting
- Secure ORM configuration (e.g., Mongoose strict mode)