// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { testOneUser, testMultipleUsers } from "../fixtures.js";

suite("User API tests", () => {

  setup(async () => {
    await placemarkService.deleteAllUsers();
    for (let i = 0; i < testMultipleUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testMultipleUsers[i] = await placemarkService.createUser(testMultipleUsers[i]);
    }
  });

  teardown(async () => {

  });

  test("Create a user", async () => {
    const newUser = await placemarkService.createUser(testOneUser);
    assertSubset(testOneUser, newUser);
    assert.isDefined(newUser._id);
  });
  
  test("Find a user", async () => {
    const returnedUser = await placemarkService.getUser(testMultipleUsers[0]._id);
    assert.deepEqual(testMultipleUsers[0], returnedUser);
  });
  
  test("Find a user - bad parameters", async () => {
    try {
      const returnedUser = await placemarkService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("Find a user - deleted user", async () => {
    await placemarkService.deleteAllUsers();
    try {
      const returnedUser = await placemarkService.getUser(testMultipleUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("Delete all users", async () => {
    let returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await placemarkService.deleteAllUsers();
    returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

});