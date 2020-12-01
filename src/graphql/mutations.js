/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: ChatRoomInput!
  ) {
    createChatRoom(input: $input) {
      success
      data
      errors
    }
  }
`;
export const CreateDefaultChatRooms = /* GraphQL */ `
  mutation CreateDefaultChatRoom(
    $input: ChatRoomInput!
  ) {
    createDefaultChatRooms(input: $input) {
      success
      data
      errors
    }
  }
`;


export const createChatMessage = /* GraphQL */ `
  mutation CreateChatMessage(
    $input: ChatMessageInput!
  ) {
    createChatMessage(input: $input) {
      id
      content
      userName
      userId
      agendaId
      createdAt
      roomId
    }
  }
`;
