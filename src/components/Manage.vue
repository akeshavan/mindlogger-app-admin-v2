<template>
  <div class="mt-3">
    <!-- back to activity set -->
    <span>
      <b-button :to="'/activitySets'" variant="default" size="sm">
        <i class="fas fa-long-arrow-alt-left"></i>
        Back to your Activity Sets
      </b-button>
    </span>

    <b-container>
      <b-row class="mt-3">
        <b-col>
          <h3> Role Management </h3>
          <p> Add/remove editors, managers, viewers, and users</p>
          <b-card no-body>
            <b-tabs card>
              <b-tab title="editors" active>
                editors
              </b-tab>
              <b-tab title="managers" >
                managers
              </b-tab>
              <b-tab title="users">
                users
              </b-tab>
              <b-tab title="viewers">
                viewers
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  name: 'manage',
};
</script>

