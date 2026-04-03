import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  collectionMock,
  docMock,
  getDocMock,
  getDocsMock,
  queryMock,
  whereMock,
} = vi.hoisted(() => ({
  collectionMock: vi.fn(),
  docMock: vi.fn(),
  getDocMock: vi.fn(),
  getDocsMock: vi.fn(),
  queryMock: vi.fn(),
  whereMock: vi.fn(),
}));

vi.mock("src/api/firebase", () => ({
  auth: {
    currentUser: {
      uid: "user-1",
      email: "User@Example.com",
    },
  },
  dataBase: {},
}));

vi.mock("firebase/firestore", () => ({
  arrayUnion: vi.fn(),
  collection: collectionMock,
  deleteField: vi.fn(),
  doc: docMock,
  getDoc: getDocMock,
  getDocs: getDocsMock,
  query: queryMock,
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  where: whereMock,
}));

import useTodoListDatabase from "src/hooks/useTodoListDatabase";

describe("useTodoListDatabase", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    collectionMock.mockReturnValue("todo-list-collection");
    docMock.mockImplementation((database, collectionName, documentId) => ({
      database,
      collectionName,
      id: documentId,
    }));
    whereMock.mockReturnValue("shared-with-filter");
    queryMock.mockReturnValue("shared-lists-query");
  });

  it("returns both owned items and lists shared with the current user", async () => {
    getDocMock.mockResolvedValue({
      data: () => ({
        items: {
          ownedItem: "Bread",
        },
      }),
    });
    getDocsMock.mockResolvedValue({
      docs: [
        {
          id: "shared-owner",
          data: () => ({
            items: {
              sharedItem: "Apples",
            },
          }),
        },
        {
          id: "user-1",
          data: () => ({
            items: {
              duplicateOwned: "Should Be Ignored",
            },
          }),
        },
      ],
    });

    const { getToDoList } = useTodoListDatabase();

    await expect(getToDoList()).resolves.toEqual([
      {
        id: "sharedItem",
        item: "Apples",
        ownerId: "shared-owner",
        isOwnedByCurrentUser: false,
      },
      {
        id: "ownedItem",
        item: "Bread",
        ownerId: "user-1",
        isOwnedByCurrentUser: true,
      },
    ]);

    expect(whereMock).toHaveBeenCalledWith(
      "sharedWith",
      "array-contains",
      "user@example.com",
    );
  });
});
