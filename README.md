
<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url] -->

<!-- [![MIT License][license-shield]][license-url] -->
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<p align="center">
<!--   <a href="https://github.com/TelescopeThieves/motifs-deploy">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">Motifs</h3>

  <p align="center">
    A platform for ephemeral audio. Posts made on Motifs disappear in 24 hours!
    <br />
    <a href="https://github.com/TelescopeThieves/motifs-deploy"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://motifs-deploy.herokuapp.com/">View Live</a>
    ·
    <a href="https://github.com/TelescopeThieves/motifs-deploy/issues">Report Bug</a>
    ·
    <a href="https://github.com/TelescopeThieves/motifs-deploy/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
<!--     <li><a href="#usage">Usage</a></li> -->
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
<!--     <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
<!--     <li><a href="#acknowledgements">Acknowledgements</a></li> -->
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Motifs is a web application where musicians can post ephemeral music. Posts on Motifs are automatically deleted within 24 hours of creation. Users are allowed to bookmark posts while they’re still live and follow their favorite creators. Options for permanent uploads and in app music purchasing is in the works.

![Motifs Screen Shot](https://res.cloudinary.com/drs4pvb1e/image/upload/v1629486315/Portfolio/Screen_Shot_2021-08-20_at_3.04.32_PM_cfv5wk.png)



<!-- Here's a blank template to get started:
**To avoid retyping too much info. Do a search and replace with your text editor for the following:**
`TelescopeThieves`, `repo_name`, `twitter_handle`, `email`, `project_title`, `project_description` -->


### Built With

* [React](https://reactjs.org/)
* [NodeJs](https://nodejs.dev/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Cloudinary](https://cloudinary.com)
* [Phosphor Icons](https://phosphoricons.com)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* [Install NodeJS](https://nodejs.org/en/download/package-manager/)
* Install npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/TelescopeThieves/motifs-deploy.git
   ```
2. Install Server-Side NPM packages:

* From the project's root folder on the terminal run
   ```sh
   npm install
   ```
3. Install Client-Side NPM packages: 
* From the project's client folder on the terminal run
   ```sh
   npm install
   ```
4. Create a Cloudinary account. In your Account Details you will find your Cloudinary cloud name, API Key and API secret.
5. Create a mongoDb account and create a new cluster. Here's a [youTube video if you need help](https://www.youtube.com/watch?v=esKNjzDZItQ).
6. Navigate to the config folder and create a .env file with the following variables:
```sh
PORT = 5000
CLOUD_NAME = Your cloudinary cloud name
API_KEY = Your cloudinary API key
API_SECRET = Your cloudinary API secret
DB_STRING = Your mongoDb cluster connection string
ACCESS_TOKEN_SECRET = An access token secret of your choice
REFRESH_TOKEN_SECRET = A refresg token secret of your choice
NODE_ENV=developement
```
7. CD into the root folder from the terminal and run
   ```sh
   npm run dev
   ```
8. CD into the client folder from the terminal and run
   ```sh
   npm start
   ```
<!-- USAGE EXAMPLES -->
<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_ -->



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/TelescopeThieves/motifs-deploy/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Your Name - [@TelescpeThieves](https://twitter.com/TelescpeThieves) - mario.jdls@gmail.com

Project Link: [https://github.com/TelescopeThieves/motifs-deploy](https://github.com/TelescopeThieves/motifs-deploy)



<!-- ACKNOWLEDGEMENTS -->
<!-- ## Acknowledgements

* []()
* []()
* []() -->





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/TelescopeThieves/motifs-deploy.svg?style=for-the-badge
[contributors-url]: https://github.com/TelescopeThieves/motifs-deploy/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/TelescopeThieves/motifs-deploy.svg?style=for-the-badge
[forks-url]: https://github.com/TelescopeThieves/motifs-deploy/network/members
[stars-shield]: https://img.shields.io/github/stars/TelescopeThieves/motifs-deploy.svg?style=for-the-badge
[stars-url]: https://github.com/TelescopeThieves/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/TelescopeThieves/motifs-deploy.svg?style=for-the-badge
[issues-url]: https://github.com/TelescopeThieves/repo_name/issues
<!-- [license-shield]: https://img.shields.io/github/license/TelescopeThieves/motifs-deploy.svg?style=for-the-badge -->
<!-- [license-url]: https://github.com/TelescopeThieves/repo_name/blob/master/LICENSE.txt -->
<!-- [linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555 -->
<!-- [linkedin-url]: https://www.linkedin.com/in/mario-de-los-santos-dev/ -->
