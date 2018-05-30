<template>
  <div class="container event-page" v-if="event">
    <div class="columns is-gapless">
      <div class="column is-three-quarters">
        <div class="event-main">
          <div class="columns is-gapless">
            <div class="column is-12">
              <div class="event-header">
                <div class="event-header__title">
                  {{event.title}}
                </div>
                <div class="event-header__top-right">
                  <div class="event-stats">
                    <div class="event-stat">
                      <div class="event-stat_heading">
                        Created by:
                      </div>
                      <div class="event-stat_data">
                        <EventCreator :id="event.creator_id" :userId="user.id" />
                      </div>
                    </div>
                    <div class="event-stat">
                      <div class="event-stat_heading">
                        Created At:
                      </div>
                      <div class="event-stat_data">
                        {{event.created_at | ago }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="event-section">
                <div class="event-section_header">
                  <div class="event-section_title">
                    <div class="event-section__icon">
                      <i class="mdi-calendar-range mdi"></i>
                    </div>
                    Date Poll
                  </div>
                  <div class="event-section_topright" @click="toggleDecider">
                    <span class="toggle">
                      {{ deciderOpen ? '-' : '+'}}
                    </span>
                  </div>
                </div>
                <div class="event-section_content" v-if="deciderOpen">
                  <div>
                    <DateDecider :id="id" />
                  </div>
                </div>
                <div class="event-section_header">
                  <div class="event-section_title">
                    <div class="event-section__icon">
                      <i class="mdi-map-marker mdi"></i>
                    </div>
                    Location
                  </div>
                  <div class="event-section_topright" @click="toggleLocation">
                    <div>
                      {{ locationOpen ? '-' : '+'}}
                    </div>
                  </div>
                </div>
                <div class="event-section_content" v-if="locationOpen">
                  <div>
                    <EventLocation :location="event.location" :title="event.title" />
                  </div>
                </div>
                <div class="event-section_header">
                  <div class="event-section_title">
                    <div class="event-section__icon">
                      <i class="mdi-message-text-outline mdi"></i>
                    </div>
                    Messages
                  </div>
                  <div class="event-section_topright" @click="toggleMessages">
                    <span class="toggle" :class="messagesOpen ? 'open' : ''">
                      +
                    </span>
                  </div>
                </div>
                <div class="event-section_content" v-if="messagesOpen">
                  <div>
                    <EventMessages :messages="messages" :id="event.id" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="event-sidebar">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase_config";
import EventCreator from "./EventCreator.vue";
import DateDecider from "./DateDecider.vue";
import EventLocation from "./EventLocation.vue";
import EventMessages from "./EventMessages.vue";
export default {
  name: "EventDetail",
  components: {
    EventCreator,
    DateDecider,
    EventLocation,
    EventMessages
  },
  props: ["id"],
  data() {
    return {
      messages: [],
      deciderOpen: true,
      locationOpen: true,
      messagesOpen: true
    };
  },
  methods: {
    confirmDate() {
      console.log("date confirmed!");
    },
    toggleDecider() {
      this.deciderOpen = !this.deciderOpen;
    },
    toggleLocation() {
      this.locationOpen = !this.locationOpen;
    },
    toggleMessages() {
      this.messagesOpen = !this.messagesOpen;
    }
  },
  computed: {
    event() {
      return this.$store.getters["event/events"].find(e => e.id === this.id);
    },
    user() {
      return this.$store.getters["user/user"];
    },
    numberOfParticipants() {
      return Object.keys(this.event.participants).length;
    }
  },
  mounted() {
    db
      .collection("events")
      .doc(this.id)
      .collection("messages")
      .orderBy("sent_at", "asc")
      .limit(20)
      .onSnapshot(snap => {
        let messages = [];
        snap.forEach(doc => {
          messages.push(doc.data());
        });
        this.messages = messages;
      });
  }
};
</script>

<style lang="scss" scoped>
.event-page {
  margin-top: 36px;
  .event-main {
    border-radius: 1%;
    padding-right: 16px;
    .event-header {
      padding: 8px;
      height: 64px;
      border-left: 3px solid $gprimary;
      display: flex;
      align-items: center;
      border-radius: 0px 4px 0px 0px;
      background: #31313c;
      justify-content: space-between;
      .event-header__title {
        font-size: 36px;
        color: white;
        padding-left: 32px;
        letter-spacing: 1.2px;
      }
      .event-header__top-right {
        color: white;
        align-self: center;
        padding-right: 32px;
        display: flex;
      }
    }
    .event-date {
      padding: 16px;
      display: flex;
      align-items: center;
      height: 64px;
      flex-direction: column;
      background: #31313c;
      justify-content: center;
      .event-date_heading {
        color: #f1f1f18a;
        text-transform: uppercase;
        font-size: 16px;
        background: #31313c;
        padding: 16px;
        height: 64px;
        align-self: center;
        justify-self: center;
      }
      .event-date_date {
        color: white;
        font-size: 18px;
      }
      .date-voting {
        background: #dedcdb;
        padding: 2px 8px;
        border-radius: 4px;
        color: rgb(24, 24, 24);
        font-size: 12px;
      }
    }
    .event-section {
      border-radius: 1%;
      margin-top: 18px;
      margin-left: 0px;
      background: #31313c;
      padding: 48px;
      height: 100vh;
      .event-section_header {
        height: 48px;
        border-bottom: 1px solid $gprimary;
        background: $gbg;
        display: flex;
        justify-content: space-between;

        .event-section_title {
          display: flex;
          align-self: center;
          font-size: 18px;
          padding-left: 8px;
          letter-spacing: 1.2px;

          .event-section__icon {
            font-size: 20px;
            justify-self: flex-start;
            padding-right: 10px;
          }
        }
        .event-section_topright {
          .toggle {
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
            transition: all 0.3s;
            padding: 16px;
            align-self: center;
            font-size: 24px;
            color: $gprimary;
            &:hover {
              cursor: pointer;
            }
          }
          .open {
            -moz-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
            font-weight: normal;
          }
        }
      }
      .event-section_content {
        padding-top: 32px;
        padding-left: 16px;
        padding-bottom: 32px;
      }
    }
  }

  .event-sidebar {
    background: #31313c;
    border-left: 3px solid $gprimary;
  }
  .event-stats {
    display: flex;
    justify-content: space-around;
    background: #31313c;
    border-radius: 0px 4px 0px 0px;

    padding: 8px;
    margin-right: 0px;
    height: 64px;
    align-items: center;
    .event-stat {
      padding-right: 32px;
    }

    .event-stat_heading {
      color: #f1f1f18a;
      text-transform: uppercase;
      font-size: 12px;
      flex: 1;
      align-self: center;
    }
    .event-stat_data {
      color: white;
      font-size: 14px;
      padding-top: 8px;
    }
  }
}
</style>