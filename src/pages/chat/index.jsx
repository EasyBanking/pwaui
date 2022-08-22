import "simplebar/dist/simplebar.css";
import { AuthGuard } from "../../wrappers/Auth";
import { Button, Grid, Input, Text, Loading } from "@nextui-org/react";
import Moment from "react-moment";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Bar from "simplebar-react";


const socket = io.connect("http://localhost:4000", {
  auth: {
    token: localStorage.getItem("X-AUTH-TOKEN"),
  },
});

const Message = (props) => {
  return (
    <div
      className={clsx({
        "mb-4 w-1/2": true,
      })}
    >
      <div className="flex flex-row items-center w-full">
        <img
          className={clsx({
            "w-10 h-10 rounded-full border-2  border-light": true,
          })}
          src={props.img}
        />

        <span className="ml-4 w-full">
          <span>
            <Text small className="flex flex-col">
              {props.user}
            </Text>
          </span>
          <p
            className={clsx({
              "text-xs mt-2   p-2 rounded-lg flex flex-col ": true,
              "bg-light": !props?.isUser,
              "bg-sub text-white": props?.isUser,
            })}
          >
            <span>{props.content}</span>
            <span className="text-2xs opacity-50 mt-1">
              <Moment fromNow={props.date} />
            </span>
          </p>
        </span>
      </div>
    </div>
  );
};

export default function Chat(props) {
  const user = useSelector((st) => st?.auth?.user);
  const [joined, setJoined] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [user_, setUser] = useState(null);
  const [queue, setQueue] = useState([]);
  const [waitForUser, setWaitForUser] = useState(false);
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const sendMessage = useCallback(() => {
    if (msg && room) {
      socket.emit("push.message", {
        date: Date.now(),
        content: msg,
        sender: user?._id,
        room,
      });

      setMsg("");
    }
  }, [msg, room]);

  const pushToReady = useCallback(
    (userId, adminId) => {
      if (socket) {
        socket.emit("user.joinChat", { user_id: userId, admin_id: adminId });
      }
    },
    [socket, user, queue]
  );

  useEffect(() => {
    if (user) {
      socket.on("connect", () => {
        setIsConnected(true);
      });

      socket.emit("admin.online", user);

      socket.on("admin.logined", (data) => {
        socket.emit("get.queue", {});
      });

      socket.on("queue", (data) => {
        console.log(data, "queue");
        setQueue(data.queue);
      });

      socket.on("disconnect", () => {
        setQueue([]);
      });

      socket.on("socket.ready", (data) => {
        console.log("a socket is joined", data);
        setWaitForUser(true);
        setUser(data?.user);
      });

      socket.on("session.starts", (data) => {
        setIsUserConnected(true);
        setWaitForUser(false);
        setRoom(data.room);
        setJoined(true);
        console.log("session starts ----", data);
      });

      socket.on("messages", ({ messages }) => {
        setMessages(messages);
      });

      return () => {
        socket.off("connect");
        socket.off("admin.logined");
        socket.off("queue");
      };
    }
  }, [user]);

  return (
    <AuthGuard>
      <Layout>
        <div className="min-h-screen pt-8 pb-6">
          <Grid.Container gap={2}>
            <Grid sm={8}>
              <div className="flex flex-col bg-white rounded-lg relative w-full">
                {waitForUser ? (
                  <div className="h-full bg-white z-30 flex flex-col rounded-md justify-center items-center w-full absolute top-0 left-0">
                    <Loading type="points" />
                    <Text className="pt-5">please wait for user</Text>
                  </div>
                ) : null}
                <div className="flex flex-row w-full justify-between">
                  <div className="p-4 flex flex-row items-center justify-start">
                    <span className="mr-4">
                      <FontAwesomeIcon
                        className={clsx({
                          "opacity-50": !isUserConnected,
                          "text-success": isUserConnected,
                        })}
                        icon="headset"
                      />
                    </span>
                    {user_?.username || "no users connected yet"}
                  </div>
                  <div className="p-4 flex flex-row items-center justify-start">
                    <FontAwesomeIcon
                      icon="dot-circle"
                      className={clsx({
                        "opacity-50": !isUserConnected,
                        "text-success": isUserConnected,
                      })}
                    />
                  </div>
                </div>
                <hr />
                <div className="p-4 flex-1">
                  <Bar style={{ height: 300 }}>
                    {joined ? (
                      messages.map((m, x) => {
                        return (
                          <Message
                            x={x}
                            img={m?.sender?.profileImg}
                            content={m?.content}
                            user={m?.sender?.username}
                            date={m?.date}
                            isUser={m?.sender?.username === user?.username}
                          />
                        );
                      })
                    ) : (
                      <p className="absolute top-0 left-0  w-full h-full flex flex-col  justify-center items-center">
                        <FontAwesomeIcon icon={"face-frown"} size="xl" />
                        <span className="text-primary bold text-xl">
                          there is no messages yet !
                        </span>
                      </p>
                    )}
                  </Bar>
                </div>
                <hr />
                <div className="relative">
                  <input
                    className={clsx({
                      "input w-full bg-lighter rounded-b-lg rounded-t-none": true,
                      "input-disabled": !joined,
                    })}
                    disabled={!joined}
                    required={true}
                    type="text"
                    value={msg}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                        setMsg("");
                      }
                    }}
                    placeholder="type a message here !"
                    onChange={(v) => setMsg(v.target.value)}
                  />
                  <button
                    className={clsx({
                      "absolute btn btn-ghost right-0": true,
                      "btn-disabled": !joined,
                    })}
                    onClick={() => sendMessage()}
                    disabled={!joined}
                  >
                    <FontAwesomeIcon icon="paper-plane" size="lg" />
                  </button>
                </div>
              </div>
            </Grid>
            <Grid sm={4}>
              <div>
                <Text h4 weight={"bold"}>
                  Pending requests
                </Text>
                <ul className="mx-0 px-0">
                  {queue?.map((usr, i) => {
                    if (i < 5) {
                      return (
                        <li>
                          <button
                            disabled={i > 0}
                            className={clsx({
                              "flex pl-0 flex-row items-center btn btn-ghost": true,
                              "btn-disabled": i > 0,
                            })}
                            onClick={() => {
                              pushToReady(usr._id, user._id);
                            }}
                          >
                            <span className="mr-3">
                              <img
                                src={usr.profileImg}
                                className="w-10 h-10 rounded-full border-2 border-success"
                              />
                            </span>
                            <span className="text-xs">{usr.username}</span>
                          </button>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </Grid>
          </Grid.Container>
        </div>
      </Layout>
    </AuthGuard>
  );
}
