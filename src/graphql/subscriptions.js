/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChatMessageByRoomId = /* GraphQL */ `
  subscription OnCreateMessageByRoomId($roomId: ID) {
    onCreateMessageByRoomId(roomId: $roomId) {
     success
      data
      errors
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
    success
      data
      errors
    }
  }
`;

export const OnCreateDefaultChatRooms = /* GraphQL */ `
  subscription OnCreateDefaultChatRooms {
    onCreateDefaultChatRooms {
      success
      data
      errors
    }
  }
`;
