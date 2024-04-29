# simple_state_management_example

This is a simple demonstration of how to utilize cookies the intended way, which is to use cookies as a way to persist application state

In this example we also show that you can do local changes using javascript to the state and the next time the server is contacted the state is persisted because we have updated the cookies

The downside with this method is that we have to have 2 implementations of the same state update methods, because the implementation is different on the client and server side, this can be a big source of bugs, our solution is to have the server actions in the save file as the state as then we follow locality of behavior which is a good defense against these types of bugs
