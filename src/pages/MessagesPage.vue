<template>
  <q-page>
    <div class="messenger-head">
      <p style="font-size:35px;padding:20px 0px 0px 20px;" class="q-my-md text-primary">
        <b>Messages</b>
      </p>
    </div>
    <div class="messenger-icon" style="
    position: absolute;
    top: 20px;
    right: 10px;">
      <q-btn style round color="red-4" icon="cancel" to="/home"></q-btn>
    </div>
    <q-card class="my-card">
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://semantic-ui.com/images/avatar2/large/kristy.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Jane</q-item-label>
            <q-item-label caption>'Hi Everyone, super excited to play and make new friends!'</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://semantic-ui.com/images/avatar2/large/kristy.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Jane</q-item-label>
            <q-item-label caption>'Hi Everyone, super excited to play and make new friends!'</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://semantic-ui.com/images/avatar2/large/kristy.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Jane</q-item-label>
            <q-item-label caption>'Hi Everyone, super excited to play and make new friends!'</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "MessagesPage",
};
</script>

