const main = document.getElementsByTagName("main")[0];

class Info {
    constructor(intro, emailFrag1, emailFrag2, emailFrag3) {
        this.intro = intro;
        this.emailFrag1 = emailFrag1;
        this.emailFrag2 = emailFrag2;
        this.emailFrag3 = emailFrag3;
    }
}

class Degree {
    constructor(degree, university, year) {
        this.degree = degree;
        this.university = university;
        this.year = year;
    }
}

class Skills {
    constructor(languages, frameworks) {
        this.languages = languages;
        this.frameworks = frameworks;
    }
}

class Project {
    constructor(name, url, description, specs) {
        this.name = name;
        this.url = url;
        this.description = description;
        this.specs = specs;
    }
}

const michaeljduncan = {
    info: new Info(
        "I am a software developer with a background in analytic philosophy (metaphysics, philosophy of science, and philosophy of probability). What I love most about programming is the almost unlimited ability to make what I imagine reality.",
        "mjduncan17",
        "kooltuo",
        "com"
    ),
    education: [
        new Degree("Doctor of Philosophy (PhD) in Philosophy", "University of Sydney", "2011-2015"),
        new Degree("Bachelor of Arts/Bachelor of Science - Honours in Psychology & Philosophy", "University of Sydney", "2002-2009")],
    skills: new Skills(["Java", "JavaScript", "CSS3", "HTML5", "SQL", "Powershell"], ["JavaFX", "Spring Boot"]),
    projects: [
        new Project(
            "Gradebook Desktop App",
            "https://github.com/fugu137/Gradebook",
            "A fully-featured GUI application built to manage my students' grades. Import class lists, enter grades, add assessments, view statistics, load, save, undo, redo, and much more.",
            ["Java", "JavaFx", "FXML", "SceneBuilder", "JavaFX-CSS"]
        ),
        new Project(
            "Tutor Finder Web App",
            "https://github.com/fugu137/Tutor-Finder_demo",
            "A demo web application which allows students to find tutors.",
            ["Java", "Spring Boot", "JavaScript", "HTML", "CSS", "Apache Tomcat Server"]
        ),
        new Project(
            "DVD-rip to MKV Converter",
            "https://github.com/fugu137/DVDRipToMKV",
            "A script to batch-convert DVD-rips to .mkv files using MakeMKV. This saved me hours of tedious work converting my DVD collection.",
            ["PowerShell"]
        )
    ],

    printInfo() {
        clearPage();
        const infoPage = document.getElementById("info-template").content.cloneNode(true);

        const infoPara = infoPage.querySelector(".info-para");
        const infoText = Array.from(infoPara.childNodes).find(node => node.nodeName === "#text");
        infoText.textContent = this.info.intro;

        const emailLink = infoPage.querySelector("a");
        const emailAddress = this.info.emailFrag1 + "@" + this.info.emailFrag2.split("").reverse().join("") + "." + this.info.emailFrag3;
        emailLink.textContent = emailAddress;
        emailLink.setAttribute("href", "mailto:" + emailAddress);

        main.appendChild(infoPage);
        displayContent();
    },

    printEducation() {
        clearPage();
        const eduHeading = document.getElementById("education-template").content.cloneNode(true);
        main.appendChild(eduHeading);

        for (let i = 0; i < this.education.length; i++) {
            const degreePara = document.getElementById("degree-template").content.cloneNode(true);
            const degree = degreePara.querySelector(".degree-name");
            const degreeText = Array.from(degree.childNodes).find(node => node.nodeName === "#text");

            const uni = degreePara.querySelector(".uni-name");
            const uniText = Array.from(uni.childNodes).find(node => node.nodeName === "#text");

            const year = degreePara.querySelector(".year");
            const yearText = Array.from(year.childNodes).find(node => node.nodeName === "#text");

            degreeText.textContent = this.education[i].degree;
            uniText.textContent = this.education[i].university;
            yearText.textContent = this.education[i].year;

            main.appendChild(degreePara);
        }
        displayContent();
    },

    printSkills() {
        clearPage();
        const skillsPage = document.getElementById("skills-template").content.cloneNode(true);
        const frameworkHeading = skillsPage.querySelector(".frameworks");

        for (let i = 0; i < this.skills.languages.length; i++) {
            const language = this.skills.languages[i];

            const languageItemFragment = document.querySelector("#language-item-template").content.cloneNode(true);
            const languageItem = Array.from(languageItemFragment.childNodes).find(node => node.nodeName === "P");
            const languageItemText = Array.from(languageItem.childNodes).find(node => node.nodeName === "#text");
            languageItemText.textContent = language;

            skillsPage.insertBefore(languageItem, frameworkHeading);
        }

        for (let i = 0; i < this.skills.frameworks.length; i++) {
            let framework = this.skills.frameworks[i];

            const frameworkItemFragment = document.querySelector("#framework-item-template").content.cloneNode(true);
            const frameworkItem = Array.from(frameworkItemFragment.childNodes).find(node => node.nodeName === "P");

            const frameworkItemText = Array.from(frameworkItem.childNodes).find(node => node.nodeName === "#text");
            frameworkItemText.textContent = framework;

            skillsPage.insertBefore(frameworkItem, skillsPage.lastChild);
        }

        main.appendChild(skillsPage);
        displayContent();
    },

    printProjects() {
        clearPage();
        const portfolioPage = document.getElementById("portfolio-template").content.cloneNode(true);

        for (let i = 0; i < this.projects.length; i++) {
            const project = document.getElementById("project-template").content.cloneNode(true);
            const projectName = project.querySelector(".project-name .link");
            projectName.textContent = this.projects[i].name;
            projectName.setAttribute("href", this.projects[i].url);

            const projectDescription = project.querySelector(".project-description");
            const projectDescText = Array.from(projectDescription.childNodes).find(node => node.nodeName === "#text");
            projectDescText.textContent = this.projects[i].description;

            const specs = project.querySelector(".project-specs");
            const specsText = Array.from(specs.childNodes).find(node => node.nodeName === "#text");
            specsText.textContent = "";

            for (let j = 0; j < this.projects[i].specs.length; j++) {
                specsText.textContent += this.projects[i].specs[j] + ", ";
            }
            specsText.textContent = specsText.textContent.slice(0, -2);

            portfolioPage.appendChild(project);
        }

        main.appendChild(portfolioPage);
        displayContent();
    }
};

const modal = document.getElementsByClassName("modal")[0];
const textInput = document.querySelector("nav input[type=text]");
let httpRequest;


function clearPage() {
    main.textContent = "";
}

function hideMainContent() {
    main.style.display = "none";
}

function showMainContent() {
    main.style.display = "flex";
}

function displayModal() {
    hideMainContent();
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
    showMainContent();
}

function closeModalAndSearch() {
    closeModal();
    textInput.removeEventListener("click", appendFoundItAltMessage);
    textInput.addEventListener("click", displayFoundItMessage);
}

function closeModalAndSkip(button) {
    closeModal();
    displayTooltip(button);

    const logo = document.getElementsByClassName("logo")[0];
    logo.addEventListener("click", function () {
        displayModal();
    });

    textInput.addEventListener("click", appendFoundItAltMessage);
}

function displayTooltip(button) {
    closeModal();

    const tooltip = document.getElementById("tooltip-template").content.cloneNode(true);
    const logoContainer = document.getElementById("logo-container");
    logoContainer.appendChild(tooltip);

    button.onclick = "null";
    button.addEventListener("click", closeModal);
}

function closeTooltip(node) {
    const tooltip = document.getElementById("tooltip1");

    if (tooltip !== undefined && tooltip !== null) {
        tooltip.parentNode.removeChild(tooltip);
        node.onclick = "null";
    }
}

function displayContent() {
    let lines = document.getElementsByTagName("main")[0].children;
    const delay = 0.3;

    setTimeout(function () {
        for (let i = 0; i < lines.length; i++) {
            lines[i].style.transitionDelay = delay * i + "s";
            lines[i].style.visibility = "visible";

            setTimeout(function () {
                lines[i].scrollIntoView(false);
            }, delay * i * 1000);
        }
    }, 500);

}

function processInput(event, inputField) {
    const value = inputField.value;
    const methodName = value.slice(0, value.length - 3);
    const method = michaeljduncan[methodName];

    if (!michaeljduncan.hasOwnProperty(methodName) || typeof method !== "function") {
        inputField.classList.remove("validated");

        if (event.key === "Enter") {
            console.log("Method " + value + " not found!")
            printErrorMessage(value);
        }

    } else {
        if (event.key === "Enter") {
            inputField.classList.add("validated");
            michaeljduncan[methodName]();
            inputField.blur();
        }
    }
}

function printErrorMessage(methodName) {
    const errorMessage = document.getElementById("error-template").content.cloneNode(true);
    const hint = errorMessage.querySelector(".hint");

    textInput.blur();
    clearPage();

    const delay = 500;

    setTimeout(function () {

        if (methodName.slice(0, 5) !== "print") {
            hint.textContent = "Method name must start with the word \"print\".";

        } else if (methodName.slice(methodName.length - 3, methodName.length) !== "();") {
            hint.textContent = "Method name should end in parentheses and a semicolon - e.g., \"();\".";

        } else if (methodName === methodName.toLowerCase()) {
            hint.textContent = "Each word (besides the first) should start with a capital letter.";

        } else {
            hint.textContent = "You're on the right track! Try a different word after \"print\".";
        }

        main.appendChild(errorMessage);
        displayContent();

    }, delay);

}

function displayFoundItMessage() {
    const greeting = document.getElementById("greeting");
    const info1 = document.getElementById("info1template").content.cloneNode(true);

    modal.removeChild(greeting);
    modal.appendChild(info1);
    modal.style.display = "inherit";

    switchListeners();

}

function appendFoundItAltMessage() {
    const greeting = document.getElementById("greeting");
    if (greeting !== undefined && greeting !== null) {
        const info1alt = document.getElementById("info1alttemplate").content.cloneNode(true);
        modal.removeChild(greeting);
        modal.appendChild(info1alt);
    }
}

function switchListeners() {
    textInput.removeEventListener("click", displayFoundItMessage);
    textInput.blur();

    const logo = document.getElementsByClassName("logo")[0];
    logo.addEventListener("click", function () {
        displayModal();
    });
}

function navigateInfoPage(fromPage, toPageTemplate) {
    const toPage = toPageTemplate.content.cloneNode(true);

    if (toPage !== null) {
        fromPage.replaceWith(toPage);
    }
}

function displayDownloadBar(download, url) {
    const tutPage = modal.querySelector("article");
    const downloadPage = document.getElementById("download-page-template").content.cloneNode(true);
    const downloadBar = downloadPage.querySelector(".progress-bar");
    const dots = downloadPage.querySelectorAll(".small-dot");
    const heading = downloadPage.querySelector("h2");
    const percent = downloadPage.querySelector(".percent");
    
    const headingText = Array.from(heading.childNodes).find(node => node.nodeName === "#text");
    headingText.textContent = "Downloading " + download;
    percent.textContent = "0%";
     
    modal.appendChild(downloadPage);
    displayModal();
    tutPage.style.display = "none";

    startDownload(downloadBar, dots, heading, percent, url);
}

function startDownload(downloadBar, dots, heading, percent, url) {
    httpRequest = new XMLHttpRequest();
    httpRequest.responseType = "blob";
    httpRequest.open("GET", url);

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.add("animated");
    }
    
    httpRequest.onreadystatechange = () => {
        if (httpRequest.status !== 200) {
            downloadBar.style.backgroundColor = "var(--text-error-color)";
            // downloadBar.style.width = "25%";
            heading.textContent = "Download failed! Unable to access file!" 
            console.log(`Error ${httpRequest.status}: ${httpRequest.statusText}`);
        }
    }

    httpRequest.onprogress = event => {
        const progress = (event.loaded / event.total) * 100;
        downloadBar.style.width = progress + "%";
        percent.textContent = Math.floor(progress) + "%";
    }

    httpRequest.onload = () => {
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("animated");
        }
        
        if (httpRequest.status !== 200) {
            downloadBar.style.backgroundColor = "var(--text-error-color)";
            downloadBar.style.width = "100%";
            percent.textContent = "100%";
            heading.textContent = "Download failed!"
            console.log(`Error ${httpRequest.status}: ${httpRequest.statusText}`);

        } else {
            if (modal.style.display !== "none") {
                heading.textContent = "Download complete!"

                var anchor = document.createElement('a');
                anchor.download = "michaelduncan_resume";
                anchor.href = URL.createObjectURL(httpRequest.response);
                anchor.click();

                URL.revokeObjectURL(anchor.href);
            }
        }
    };

    httpRequest.send();
}

function closeDownloadPage() {
    const downloadPage = modal.querySelector(".download-page");
    const downloadBar = downloadPage.querySelector(".progress-bar");
    // const heading = downloadPage.querySelector("h2");

    if (httpRequest !== undefined || httpRequest !== null) {
        httpRequest.abort();
        httpRequest = null;
    }

    downloadBar.style.width = "0";
    
    modal.removeChild(downloadPage);
    modal.firstElementChild.style.display = "block";
    modal.style.display = "none";
    showMainContent();
}

