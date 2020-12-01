/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $searchParams: ListChatRoomsSearchParamsInput
  ) {
    listChatRooms(searchParams: $searchParams) {
     success
     data
     errors
    }
  }
`;

export const listDefaultChatRooms = /* GraphQL */ `
  query ListDefaultChatRooms(
    $searchParams: ListChatRoomsSearchParamsInput
  ) {
    listDefaultChatRooms(searchParams: $searchParams) {
     success
     data
     errors
    }
  }
`;

export const listChatMessagesForRoom = /* GraphQL */ `
  query ListChatMessagesForRoom(
    $roomId: ID
    $sortDirection: ModelSortDirection
  ) {
    listChatMessagesForRoom(
      roomId: $roomId
      sortDirection: $sortDirection
    ) {
      items {
        id
        content
        owner
        createdAt
        roomId
      }
    }
  }
`;
