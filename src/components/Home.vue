<template>
    <div class="container">
        <div class="columns">
            <div class="column is-three-quarters">
                <div class="hero box">
                    <div class="hero-body">
                        <div class="title is-size-2 has-text-white">Gentse feesten</div>
                    </div>
                    <div class="hero-foot">
                        <nav class="tabs">

                            <ul>
                                <li class="is-active">
                                    Overview
                                </li>
                                <li>
                                    When
                                </li>
                                <li>
                                    Where
                                </li>
                                <li>
                                    Who
                                </li>

                            </ul>

                        </nav>
                    </div>
                </div>
            </div>
            <div class="column is-one-quarter">
                <div class="box">
                    hello
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      title: "hello"
    };
  }
};
</script>

<style lang="scss" scoped>
.box {
  background: $gbg;
  padding: 0;
}
.hero {
  padding: 0;
}
.tabs {
  li {
    width: 10%;
    border-radius: 4px 4px 0 0;
    padding: 2px;
    &:hover {
      background: darken($gprimary, 20%);
      color: white;
    }
  }
}
// .status-tag {
//   background: #403d52;
// }
// .event-date {
//   color: #636b73;
//   font-size: 12px;
// }
// .set-date-button {
//   background: transparent;
//   font-size: 14px;
//   color: white;
//   width: 33%;
//   height: 40px;
//   border: 1px solid $gprimary;
// }
// .event-header {
//   display: flex;
//   align-items: baseline;
//   justify-content: space-between;
//   //   border-bottom: 1px solid rgba(254, 253, 253, 0.3);
//   box-shadow: 14px 1px 20px 0px rgba(10, 10, 10, 0.1),
//     inset -1px -8px 0px 1px #4cecf9;
//   .event-title {
//     font-size: 48px;
//     letter-spacing: 2px;
//     color: #ffffff;
//     padding: 16px 32px;
//   }
//   .event-status {
//     padding-right: 64px;
//   }
//   .event-subtitle {
//     font-size: 18px;
//     color: #636b73;
//     padding-left: 8px;
//     letter-spacing: 1.2px;
//     margin-bottom: 10px;
//   }
//   .event-by {
//     font-size: 12px;
//     color: #636b73;
//   }
//   .event-creator {
//     color: #4cecf9;
//     font-size: 14px;
//     padding: 0px 16px 0px 2px;
//   }
// }
// .created-by {
//   font-size: 10px;
//   text-transform: capitalize;
//   color: #636b73;
// }
// .box {
//   background: #2c2a39;
//   color: white;
//   padding: 0;
//   border-radius: 3px;
//   .header {
//     padding: 16px 32px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     min-height: 48px;
//     // background: #2f2f3a;
//     // border-bottom: 1px solid white;

//     .header-title {
//       color: #636b73;
//       font-weight: 300;
//       letter-spacing: 1.2px;
//       font-size: 12px;
//       text-transform: uppercase;
//     }
//     .header-aside {
//       color: #61677b;
//       font-weight: 500;
//       letter-spacing: 1.1px;
//       font-size: 10px;
//       .button-plus {
//         font-size: 16px;
//         // border: 1px solid $gprimary;
//         // background: $gbgitems;
//         background: transparent;
//         padding: 4px;
//         border: 0;
//         color: white;
//         font-weight: 800;
//         height: 32px;
//         width: 32px;
//         transition: all 0.1s ease-in-out;
//         border-radius: 50%;
//         &:hover {
//           font-size: 18px;
//           color: white;
//           transform: scale(1.2);
//           cursor: pointer;
//           background: $gprimary;
//         }
//         &:focus {
//           outline: none;
//         }
//       }
//     }
//   }
//   .my-divider {
//     border-bottom: 1px solid #b9b9b929;
//     // border-bottom: 1px solid white;
//     width: 80%;
//     // margin: 0 auto;
//   }
//   .my-content {
//     color: #c4c4da;
//     padding: 16px 32px;
//     font-weight: 400;
//     letter-spacing: 0.4px;
//     font-size: 12px;
//     font-family: "Open Sans";
//     line-height: 18px;
//     // background: #2f2f3a;
//   }
// }
// .my-avatar {
//   height: 36px;
//   width: 36px;
//   border-radius: 40%;
//   //   padding: 4px;
//   margin: 0 2px;
//   opacity: 0.7;
// }
// .content-item {
//   display: flex;
//   align-items: baseline;
//   .and-more {
//     padding-left: 8px;
//     color: #a6a9b1;
//     letter-spacing: 1.1px;
//   }
// }

// .my-footer {
//   display: flex;
//   justify-content: flex-end;
//   .footer-right {
//     color: #61677b;
//     font-size: 10px;
//     padding: 8px;
//     &:hover {
//       color: white;
//       cursor: pointer;
//       background: $gbgitems;

//       border-radius: 3px;
//     }
//   }
// }
</style>