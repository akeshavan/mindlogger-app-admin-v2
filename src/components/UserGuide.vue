<template>
  <div class="mt-3">
    <b-container>
      <b-row class="jumbotron mb-0 pb-0 mt-3 pt-3">
        <b-col class="text-center mt-3">
          <h1>Mindlogger User Guide</h1>
          <p class="lead">How to create activities, push activities to users,
            and download data
            using the Mindlogger admin panel
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
          <h2>Create</h2>
          <p>
            Mindlogger activities are grouped into an <b> Activity Set </b>.
            Each activity set contains various <b>Activities</b> (aka EMA's or surveys).
            An activity consists of various <b> Screens </b>.
            A screen contains some <i> text </i> and an <i>input</i> -
            this could be a radio button, checkboxes, sliders, etc.
          </p>
          <div class="text-center">
            <img src="@/assets/custom/MentalModel.svg" class="w-75 mb-3"/>
          </div>
          <p>
            We've added some screenshots below to guide you through creating your
            own activity set, activities, and screens.
          </p>

          <!-- start screenshots here -->
          <b-row>
            <b-col cols="4">
              <img src="@/assets/screenshots/YourActivitySets.png" class="w-100 ml-3 mr-3 pl-3 pr-3 screenshot"/>
            </b-col>
            <b-col>
              <p>
              At the top navbar, navigate to <a href="/activitySets">Your Activity Sets</a>
              where you will see a table of activity sets (it may be empty if you are
              first using this site). You'll notice there are columns and (possibly)
              buttons that will let you edit, manage, or view data for an activity set.
              These roles will be explained in detail in the next section.
              </p>
              <p>
              The green "Create a New Activity Set" button will navigate you to a new page
              where you can name you activity set and add activities.
              </p>
            </b-col>
          </b-row>

          <b-row class="mt-3 mb-3">
            <b-col>
              <p>
                You can edit the name of you activity set by clicking the title
                and subtitle and typing. The page will <b>save automatically</b>
                so you don't need to press any buttons.
              </p>
              <p>
                You'll also see a table of activities. To create a new activity,
                click the "Create New Activity" button in green. You can also
                click the name of an existing activity in the activity table.
              </p>
              <p>
                There are also navigation buttons at the top right to quickly
                jump to the role management and view data panels.
              </p>
            </b-col>
            <b-col cols="4">
              <img src="@/assets/screenshots/EditActivitySet.png" class="w-100 ml-3 mr-3 pl-3 pr-3 screenshot"/>
            </b-col>
          </b-row>

          <!-- live screen edit gif here -->
          <b-row class="mt-3 mb-3">
            <b-col cols="4">
              <img src="@/assets/screenshots/LiveScreenEdit.gif" class="w-100 ml-3 mr-3 pl-3 pr-3 screenshot"/>
            </b-col>
            <b-col>
              <p>
                Each activity consists of screens. You can see the screens at the top of the page.
                Each screen previews in real time, so as you edit the screen, you can get an idea
                for how it will look on a mobile phone.
              </p>
              <p>
                Its really important that you don't try to pack too much into 1 screen!
                A general rule of thumb is, to only ask 1 question per screen.
              </p>
              <p>
                Just like the activity set panel, the edits you make to the screens are
                <b>saved automatically</b>, so you don't have to worry about losing your work.
              </p>
            </b-col>
          </b-row>

        </b-col>
      </b-row>


      <b-row class="mt-3 pt-3">
        <b-col>
          <h2>Push</h2>
          <p>
            In order to push an activity set to a mobile phone, we need to add
            <span class="text-danger">Users</span>
            to our activity set. There are 4 <b> roles </b>
            in Mindlogger: <span class="text-primary">Editors</span>
            who can edit activities within an activity set,
            <span class="text-success">Managers</span>, who can
            assign <span class="text-danger">Users</span> to an activity set,
            and
            <span class="text-info">Viewers</span>
            to authorize people to see data of <span class="text-danger">Users</span>.
          </p>
          <div class="text-center">
            <img src="@/assets/custom/RoleManagement.svg" class="w-50 mb-3"/>
          </div>
          <p>
            When you create a new activity set, you are automatically assigned 2 roles:
            an <span class="text-primary">Editor</span> and
            <span class="text-success">Manager</span>.
            Since you are a <span class="text-success">Manager</span>,
            you can add a <span class="text-danger">User</span>. Once you
            add a <span class="text-danger">User</span> to your activity set,
            they will have automatically receive your activity set on their mobile phones
            through the Mindlogger phone app. Before pushing your activity set to
            real users, its a good idea to add yourself as a <span class="text-danger">User</span>
            so you can test out your activity set.
          </p>
          <!-- show the user panel here -->
          <b-row class="mt-3 mb-3">
            <b-col>
              <p>
                You can navigate to the Role Management panel either from
                <a href="/activitySets">Your Activity Sets</a>
                or from the editor panel. The screenshot to the right shows
                the 4 roles you can manage. In this example,
                I've added myself as a user to my activity set.
                This way I can see how it looks on my phone.
              </p>

              <p>
                To add a new user, start typing their email address in the
                text input at the bottom, and then click
                "Add". If the email address already has an account on our site,
                it will autopopulate so you can select it.
                If not, a new screen will pop up, asking you to create an account
                for a new Mindlogger user.
              </p>

              <p>
                The panel works the same way for adding
                <span class="text-primary">Editors</span> and
                <span class="text-success">Managers</span>.
                You can also use the search tool to filter the tables.
              </p>

            </b-col>
            <b-col cols="4">
              <img src="@/assets/screenshots/RoleManagementPanel.png" class="w-100 ml-3 mr-3 screenshot"/>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="mt-3 pt-3 mb-3">
        <b-col>
          <h2>Get Data</h2>
          <p>
            In order to see the data of <span class="text-danger">User</span>, you must be a
            <span class="text-info">Viewer</span>. Since you are a
            <span class="text-success">Manager</span>,
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
            to different people in the study, and we may want to keep user data private,
            only showing it to those who are authorized to see it on our IRB.
          </p>

          <!-- showing the viewer panel here -->
          <!-- show the user panel here -->
          <b-row class="mt-3 mb-3">
            <b-col cols="4">
              <img src="@/assets/screenshots/AddUserToViewer.png" class="w-100 ml-3 mr-3 screenshot"/>
            </b-col>
            <b-col>
              <p>
                Before deploying your activity set to real users, its a good idea to
                add yourself as a <span class="text-info">Viewer</span> that has access
                to yourself as a <span class="text-danger">User</span>. That way you can
                take a look at the data you're collecting and make sure it meets
                your expectations.
              </p>
              <p>
                The screenshot on the left shows how I've
                added myself as a viewer to see my own data. To add new viewers,
                make sure all checkboxes are cleared, and add as you would an editor,
                manager, or user. To add specific users to a viewer, check the viewers who
                you want to add the user to, and then type in the user's email in the text
                input at the bottom. Then click the "Add User to Viewers" button in blue.
              </p>
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

