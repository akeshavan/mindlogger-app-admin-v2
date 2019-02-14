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
        </b-col>
      </b-row>
      <b-row class="mt-3 pt-3">
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
        </b-col>
      </b-row>

      <b-row class="mt-3 pt-3">
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

          <p>
            Before deploying your activity set to real users, its a good idea to
            add yourself as a <span class="text-info">Viewer</span> that has access
            to yourself as a <span class="text-danger">User</span>. That way you can
            take a look at the data you're collecting and make sure it meets
            your expectations.
          </p>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<style>
  .customWidth {
    width: 30%;
  }
</style>
