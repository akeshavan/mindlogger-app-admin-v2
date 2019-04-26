<template>
  <div class="mt-3">
    <b-container>
      <b-row class="jumbotron mb-0 pb-0 mt-3 pt-3">
        <b-col class="text-center mt-3">
          <h1>Mindlogger User Guide</h1>
          <p class="lead">How to use a Mindlogger applet, view data,
            create your own applet, and share with users
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
              for features requests or bug fixes on our code repository
              <a href="https://github.com/akeshavan/mindlogger-app-admin-v2">here</a>.
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
          <p>This User Guide describes three different roles for
          interacting with Mindlogger.
          Let's imagine that you want to use mobile devices
          to collect voice and survey data
          from a group of participants in a "Speech Study".
          You would first register on the
          <a href="https://app.mindlogger.info">app.mindlogger.info</a> website,
          then find or create the "Speech Study" applet.
          As a manager of the "Speech Study" applet, you would assign people
          to different roles:
          <br><br>
          <span class="text-danger">User</span>:
              "I get notifications on my phone to take the Speech Study survey
              and record my voice."
          <br><br>
          <span class="text-info">Reviewer</span>:
              "I view <span class="text-danger">User</span>'s
              Speech Study data."
          <br><br>
          <span class="text-success">Manager</span>:
              "I manage <span class="text-danger">User</span>,
              <span class="text-info">Reviewer</span>,
              and <span class="text-success">Manager</span>
              permissions for the Speech Study applet."
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
          <h2><span class="text-danger">Users</span></h2>
          <p>
            A <span class="text-danger">User</span> is assigned to a
            given project by a <span class="text-success">Manager</span>.
            In the example given in the Introduction,
            when the <span class="text-danger">User</span> installs
            and opens up the Mindlogger mobile app,
            the <span class="text-danger">User</span> will see a Speech Study
            applet with a Speech Survey activity
            and Voice activity.
            The <span class="text-danger">User</span> will receive
            notifications set by the <span class="text-success">Manager</span>
            to perform these activities.
          </p>
          <div class="text-center">
            <img src="@/assets/screenshots/app1-login.png" width=150px/>
            <img src="@/assets/screenshots/app3-activities.png" width=150px/>
            <img src="@/assets/screenshots/app4-question.png" width=150px/>
            <img src="@/assets/screenshots/app5-instruction.png" width=150px/>
            <img src="@/assets/screenshots/app6-picture.png" width=150px/>
            <img src="@/assets/screenshots/app7-record.png" width=150px/>
          </div>
          <!-- start screenshots here -->
          <b-row>
            <b-col cols="1">
            </b-col>
            <b-col>
              <p>
              <i>Examples screenshots of a Mindlogger activity:</i>
              login, activity list,survey question,
              text instruction, picture, and voice record screens
              </p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="mt-3 pt-3 mb-3">
        <b-col>
          <h2><span class="text-info">Reviewers</span></h2>
          <p>
            If you want to view data for a specific
            <span class="text-danger">User</span> on
            the <i><span class="text-info">Reviewer</span> webpage</i>,
            you must be assigned as a
            <span class="text-info">Reviewer</span>
            by the <span class="text-success">Manager</span>.
            If you are the <span class="text-success">Manager</span>,
            you can add yourself as a <span class="text-info">Reviewer</span>, and then you need to
            add <span class="text-danger">Users</span> to each
            <span class="text-info">Reviewer</span>.
            This may seem unnecessarily complicated at first,
            but in many large data-collection projects, we may want to
            distribute work to different people in the study, and we may want
            to keep <span class="text-danger">User</span> data private.
          </p>
          <div class="text-center">
            <img src="@/assets/custom/ManagerRole.svg" class="customWidth mb-3"/>
          </div>
          <!-- showing the viewer panel here -->
          <!-- show the user panel here -->
          <b-row class="mt-3 mb-3">
            <b-col cols="4">
              <img src="@/assets/screenshots/AddUserToViewer.png"
              class="w-100 ml-3 mr-3 screenshot"/>
            </b-col>
            <b-col>
              <p>
                Before deploying your applet to real
                <span class="text-danger">Users</span>,
                it's a good idea to add yourself as a
                <span class="text-info">Reviewer</span> that has access
                to yourself as a <span class="text-danger">User</span>.
                That way you can take a look at the data you're collecting
                and make sure it meets your expectations.
              </p>
              <p>
                The screenshot on the left shows how I've
                added myself as a <span class="text-info">Reviewer</span>
                to see my own data.
                To add <span class="text-info">Reviewers</span>
                to a specific <span class="text-danger">User</span>,
                check the <span class="text-info">Reviewers</span>
                and then type in the <span class="text-danger">User</span>'s
                email in the text input at the bottom.
                Then click the "Add User to Reviewers" button in blue.
              </p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>


      <b-row class="mt-3 pt-3">
        <b-col>
          <h2><span class="text-success">Managers</span></h2>
          <p>
            <span class="text-success">Managers</span> assign roles
            for a Mindlogger applet in
            the <i><span class="text-success">Manager</span> webpage</i>.
            For example, to push an applet to a mobile device, we need to assign
            <span class="text-danger">Users</span> to our applet.
          </p>
          <p>
            When you create a new applet, you are automatically assigned
            as a
            <span class="text-success">Manager</span>.
            Since you are a <span class="text-success">Manager</span>,
            you can add a <span class="text-danger">User</span>.
            Once you add one or more <span class="text-danger">Users</span>
            to your applet, they will automatically receive your applet on
            their mobile devices through the Mindlogger mobile app.
            Before pushing your applet to real users,
            it's a good idea to add yourself as a
            <span class="text-danger">User</span>
            so you can test out your applet.
          </p>
          <!-- show the user panel here -->
          <b-row class="mt-3 mb-3">
            <b-col>
              <p>
                You can navigate to the
                <i><span class="text-success">Manager</span> webpage</i>
                from <a href="/activitySets">Your Applets</a>.
                The screenshot to the right shows the four roles you can manage.
                In this example, I've added myself as a
                <span class="text-danger">User</span> to my applet.
                This way I can see how it looks on my mobile device.
              </p>
              <p>
                To add a new <span class="text-danger">User</span>,
                start typing their email address in the
                text input at the bottom, and then click
                "Add". If the email address already has an account on our site,
                it will autopopulate so you can select it.
                If not, a new screen will pop up, asking you to create an account
                for a new Mindlogger <span class="text-danger">User</span>.
              </p>
              <p>
                The panel works the same way for adding
                other
                <span class="text-success">Managers</span>.
                You can also use the search tool to filter the tables.
              </p>
              <p>
                We wish you all the best in managing your first
                Mindlogger applet!
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

