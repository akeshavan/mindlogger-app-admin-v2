<template>
  <div class="mt-3">
    <b-container>
      <b-row class="jumbotron mb-0 pb-0 mt-3 pt-3">
        <b-col class="text-center mt-3">
          <h1>Mindlogger User Guide</h1>
          <p class="lead">How to create applets, push applets to users,
            and view or download data
            using the Mindlogger website
          </p>
          <b-alert show variant="warning" dismissible>
            <p class="mb-0">
              <strong>
              This website is a work in progress, and this
              user guide isn't complete yet.
              </strong>
            </p>
            <p class="mb-0 text-left">
              If you have any comments or questions, please
              download the <a href="">hypothes.is</a>
              chrome extension and leave comments on this page
              or any page on this site.
            </p>
            <p class="mb-0 text-left">
              If you have a GitHub account, you can open issues
              for features requests or bug fixes on our code
              repository <a href="https://github.com/akeshavan/mindlogger-app-admin-v2">here</a>.
            </p>
          </b-alert>

          <b-alert :show="!isLoggedIn" variant="danger">
            <p class="mb-0">
              <strong>You need to be logged in to create, push,
                and view activities and data on Mindlogger!</strong>
            </p>
            <p class="mb-0">
              Either <router-link to="/login">log in</router-link> or
              <router-link to="/signup">sign up</router-link>
              to get started.
            </p>
          </b-alert>

        </b-col>
      </b-row>



      <b-row class="mt-3 pt-3 mb-3">
        <b-col>
          <h2>Introduction</h2>
          <p>Let's give an example of how different people would interact with Mindlogger.
          <br><br>
          Let's say you want to run a speech research study where your study participants
          take a survey once a day and record their voice once a week.
          You would register on the <a href="https://app.mindlogger.info">app.mindlogger.info</a> website,
          and create a new "Speech Study" applet with a survey module and a voice module (see Editor section below).
          As a manager of the "Speech Study" applet, you would assign people to different roles:
          <ul>
           <li><span class="text-danger">User</span>: "I get notifications on my phone to take the Speech Study survey and record my voice."</li>
           <li><span class="text-info">Viewer</span>: "I view <span class="text-danger">User</span>'s Speech Study data."</li>
           <li><span class="text-primary">Editor</span>: "I edit the content of the Speech Study applet."</li>
           <li><span class="text-success">Manager</span>: "I manage people's roles for how they interact with the Speech Study applet."</li>
          </ul>
          </p>
          <div class="text-center">
            <img src="@/assets/custom/RoleManagement.svg" class="w-50 mb-3"/>
          </div>
          <p>
            Below we will give a brief description of each role with accompanying screenshots.
          </p>
        </b-col>
      </b-row>



      <b-row class="mt-3 pt-3 mb-3">
        <b-col>
          <h2>User</h2>
          <p>
            A <span class="text-danger">User</span> is assigned to a given project by a manager. 
            In the example given in the Introduction, 
            when the <span class="text-danger">User</span> installs and opens up the Mindlogger app 
            on the <span class="text-danger">User</span>'s mobile device,
            the <span class="text-danger">User</span> will see a Speech Study applet with a survey module and voice module.
            The <span class="text-danger">User</span> will receive notifications set by the 
            <span class="text-success">Manager</span> to perform activities in these modules.
          </p>
          <div class="text-center">
            <img src="@/assets/custom/MentalModel.svg" class="w-75 mb-3"/>
          </div>
          <!-- start screenshots here -->
          <b-row>
            <b-col cols="4">
              <img src="@/assets/screenshots/mindlogger-screenshots.png"
              class="w-100 ml-3 mr-3 pl-3 pr-3 screenshot"/>
            </b-col>
            <b-col>
              <p>
              From left to right: login screen, list of modules, survey module
              </p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>



      <b-row class="mt-3 pt-3 mb-3">
        <b-col>
          <h2>Viewer</h2>
          <p>
            If you want to view data for a specific <span class="text-danger">User</span>, 
            you must be assigned as a 
            <span class="text-info">Viewer</span> by the <span class="text-success">Manager</span>.
            If you are the <span class="text-success">Manager</span>,
            you can add yourself as a <span class="text-info">Viewer</span>, and then you need to
            add <span class="text-danger">Users</span> to each
            <span class="text-info">Viewer</span>.
          </p>
          <div class="text-center">
            <img src="@/assets/custom/ManagerRole.svg" class="customWidth mb-3"/>
          </div>
          <p>
            This role management seems unecessarily complicated at a first glance,
            but in a large data-collection project, we may want to distribute work
            to different people in the study, and we may want to keep <span class="text-danger">User</span> data private,
            only showing it to those who are authorized to see it on our IRB.
          </p>
          <!-- showing the viewer panel here -->
          <!-- show the user panel here -->
          <b-row class="mt-3 mb-3">
            <b-col cols="4">
              <img src="@/assets/screenshots/AddUserToViewer.png"
              class="w-100 ml-3 mr-3 screenshot"/>
            </b-col>
            <b-col>
              <p>
                Before deploying your applet to real <span class="text-danger">Users</span>, 
                it's a good idea to add yourself as a <span class="text-info">Viewer</span> that has access
                to yourself as a <span class="text-danger">User</span>. That way you can
                take a look at the data you're collecting and make sure it meets your expectations.
              </p>
              <p>
                The screenshot on the left shows how I've
                added myself as a <span class="text-info">Viewer</span> to see my own data. 
                To add new <span class="text-info">Viewers</span>,
                make sure all checkboxes are cleared, and add as you need an <span class="text-primary">Editor</span>,
                <span class="text-success">Manager</span>, or <span class="text-danger">User</span>. 
                To add specific <span class="text-danger">Users</span> to a <span class="text-info">Viewer</span>, 
                check the viewers who you want to add the <span class="text-danger">User</span> to, 
                and then type in the <span class="text-danger">User</span>'s email in the text
                input at the bottom. Then click the "Add User to Viewers" button in blue.
              </p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>


      <b-row class="mt-3 pt-3 mb-3">
        <b-col>
          <h2><span class="text-primary">Editor</span></h2>
          <p>
            A Mindlogger applet contains one or more modules.
            In the example above, the Speech Study applet contains a survey module and a voice module.
            Each module consists of a sequence of screens;
            the survey module's screens contain survey questions.
            The Editor builds or edits each screen using widgets.
            The standard widgets that can be used for any screen include:
            picture, text display, audio play, and comment box widgets.
            Additional survey widgets include radio buttons, checkboxes, slider bar, table, etc.
            There is also a draw widget, voice record widget, and photo capture widget.
          </p>
          <div class="text-center">
            <img src="@/assets/custom/MentalModel.svg" class="w-75 mb-3"/>
          </div>
          <p>
            We've added some screenshots below to guide you through creating your
            own applet, modules, and screens.
          </p>
          <!-- start screenshots here -->
          <b-row>
            <b-col cols="4">
              <img src="@/assets/screenshots/YourActivitySets.png"
              class="w-100 ml-3 mr-3 pl-3 pr-3 screenshot"/>
            </b-col>
            <b-col>
              <p>
              At the top navbar, navigate to
              <router-link to="/activitySets">Your Applets</router-link>
              where you will see a table of applets (it may be empty if you haven't
              used this site before). You'll notice there are columns and (possibly)
              buttons that will let you edit, manage, or view data for an applet.
              See the relevant sections of this user guide for descriptions of each of these roles.
              </p>
              <p>
              The green "Create a New Applet" button will navigate you to a new page
              where you can name your applet and add modules.
              </p>
            </b-col>
          </b-row>
          <b-row class="mt-3 mb-3">
            <b-col>
              <p>
                You can edit the name of your applet by clicking the title
                and subtitle and typing. The page will <b>save automatically</b>
                so you don't need to press any buttons.
              </p>
              <p>
                You'll also see a table of modules. To create a new module,
                click the "Create New Module" button in green. You can also
                click the name of an existing module in the module table.
              </p>
              <p>
                There are also navigation buttons at the top right to quickly
                jump to the manager webpage and viewer webpage.
              </p>
            </b-col>
            <b-col cols="4">
              <img src="@/assets/screenshots/EditActivitySet.png"
              class="w-100 ml-3 mr-3 pl-3 pr-3 screenshot"/>
            </b-col>
          </b-row>
          <!-- live screen edit gif here -->
          <b-row class="mt-3 mb-3">
            <b-col cols="4">
              <img src="@/assets/screenshots/LiveScreenEdit.gif"
              class="w-100 ml-3 mr-3 pl-3 pr-3 screenshot"/>
            </b-col>
            <b-col>
              <p>
                Each module consists of a sequence of screens. You can see the screens at the top of the page.
                Each screen previews in real time, so as you edit the screen, you can get an idea
                of how it will look on a mobile device.
              </p>
              <p>
                It's really important that you don't try to pack too much into a single screen!
                A general rule of thumb is to separate instructions from an activity,
                such as a survey question or draw activity.
              </p>
              <p>
                Just like the applet panel, the edits you make to the screens are
                <b>saved automatically</b>, so you don't have to worry about losing your work.
              </p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>




      <b-row class="mt-3 pt-3">
        <b-col>
          <h2>Manager</h2>
          <p>
            In order to push an applet to a mobile device, we need to add
            <span class="text-danger">Users</span>
            to our applet. There are four <b> roles </b>
            in Mindlogger, described above: <span class="text-primary">Editors</span>
            who can edit modules within an applet,
            <span class="text-success">Managers</span>, who can
            assign <span class="text-danger">Users</span> to an applet,
            and
            <span class="text-info">Viewers</span>
            to see data of specific <span class="text-danger">Users</span>.
          </p>
          <div class="text-center">
            <img src="@/assets/custom/RoleManagement.svg" class="w-50 mb-3"/>
          </div>
          <p>
            When you create a new applet, you are automatically assigned two roles:
            an <span class="text-primary">Editor</span> and
            <span class="text-success">Manager</span>.
            Since you are a <span class="text-success">Manager</span>,
            you can add a <span class="text-danger">User</span>. 
            Once you add one or more <span class="text-danger">Users</span> to your applet,
            they will automatically receive your applet on their mobile devices
            through the Mindlogger mobile app. Before pushing your applet to
            real users, it's a good idea to add yourself as a <span class="text-danger">User</span>
            so you can test out your applet.
          </p>
          <!-- show the user panel here -->
          <b-row class="mt-3 mb-3">
            <b-col>
              <p>
                You can navigate to the <span class="text-success">Manager</span> webpage either from
                <a href="/activitySets">Your Applets</a>
                or from the <span class="text-primary">Editor</span> webpage. 
                The screenshot to the right shows the four roles you can manage. 
                In this example, I've added myself as a <span class="text-danger">User</span> to my applet.
                This way I can see how it looks on my mobile device.
              </p>
              <p>
                To add a new <span class="text-danger">User</span>, start typing their email address in the
                text input at the bottom, and then click
                "Add". If the email address already has an account on our site,
                it will autopopulate so you can select it.
                If not, a new screen will pop up, asking you to create an account
                for a new Mindlogger <span class="text-danger">User</span>.
              </p>
              <p>
                The panel works the same way for adding
                <span class="text-primary">Editors</span> and
                <span class="text-success">Managers</span>.
                You can also use the search tool to filter the tables.
              </p>
            </b-col>
            <b-col cols="4">
              <img src="@/assets/screenshots/RoleManagementPanel.png"
              class="w-100 ml-3 mr-3 screenshot"/>
            </b-col>
          </b-row>
        </b-col>
      </b-row>



    </b-container>
  </div>
</template>

<style>
  .customWidth {
    width: 30%;
  }

  .screenshot {
    -webkit-box-shadow: 3px 5px 30px -10px rgba(0,0,0,0.75);
    -moz-box-shadow: 3px 5px 30px -10px rgba(0,0,0,0.75);
    box-shadow: 3px 5px 30px -10px rgba(0,0,0,0.75);
  }
</style>

<script>
export default {
  name: 'UserGuide',
  props: {
    isLoggedIn: {
      type: Boolean,
    },
  },
};
</script>

