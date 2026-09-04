// ============================================================
// MONOPOLY UK
// Supabase Multiplayer Core
// js/supabase.js
//
// 功能：
// 1. Supabase 連線
// 2. 房間建立 / 加入
// 3. 玩家資料
// 4. 遊戲資料
// 5. Realtime 即時同步
// 6. RPC 呼叫
// ============================================================


// ============================================================
// MODULE 1
// Supabase Client
// ============================================================

import {
  createClient
} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


// ------------------------------------------------------------
// Supabase Project
// ------------------------------------------------------------

const SUPABASE_URL =
  "https://aeqhrcdlmpqncddridaj.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_mpr9262EO73p6B6KHBhc7A_l-TBVzPc";


// ------------------------------------------------------------
// 建立 Supabase Client
// ------------------------------------------------------------

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  }
);


// ============================================================
// MODULE 2
// Connection Test
// ============================================================

export async function testSupabaseConnection() {

  try {

    const { data, error } = await supabase
      .from("rooms")
      .select("id")
      .limit(1);

    if (error) {
      console.error(
        "Supabase connection/database error:",
        error
      );

      return {
        ok: false,
        error
      };
    }

    console.log("Supabase connected.");

    return {
      ok: true,
      data
    };

  } catch (error) {

    console.error(
      "Supabase connection failed:",
      error
    );

    return {
      ok: false,
      error
    };
  }
}


// ============================================================
// MODULE 3
// 房間
// ============================================================


// ------------------------------------------------------------
// 建立房間
//
// 依照你的 SQL RPC：
// create_room
// ------------------------------------------------------------

export async function createRoom(
  roomCode,
  playerName
) {

  try {

    const { data, error } = await supabase
      .rpc("create_room", {
        p_room_code: roomCode,
        p_player_name: playerName
      });

    if (error) {

      console.error(
        "create_room error:",
        error
      );

      throw error;
    }

    return data;

  } catch (error) {

    console.error(
      "Failed to create room:",
      error
    );

    throw error;
  }
}


// ------------------------------------------------------------
// 加入房間
//
// 依照你的 SQL RPC：
// join_room
// ------------------------------------------------------------

export async function joinRoom(
  roomCode,
  playerName
) {

  try {

    const { data, error } = await supabase
      .rpc("join_room", {
        p_room_code: roomCode,
        p_player_name: playerName
      });

    if (error) {

      console.error(
        "join_room error:",
        error
      );

      throw error;
    }

    return data;

  } catch (error) {

    console.error(
      "Failed to join room:",
      error
    );

    throw error;
  }
}


// ============================================================
// MODULE 4
// 取得房間
// ============================================================

export async function getRoom(roomCode) {

  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("room_code", roomCode)
    .maybeSingle();

  if (error) {

    console.error(
      "getRoom error:",
      error
    );

    throw error;
  }

  return data;
}


// ============================================================
// MODULE 5
// 玩家
// ============================================================

export async function getPlayers(roomId) {

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("room_id", roomId)
    .order("player_order", {
      ascending: true
    });

  if (error) {

    console.error(
      "getPlayers error:",
      error
    );

    throw error;
  }

  return data || [];
}


// ============================================================
// MODULE 6
// 遊戲
// ============================================================


// ------------------------------------------------------------
// 取得遊戲
// ------------------------------------------------------------

export async function getGame(roomId) {

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("room_id", roomId)
    .maybeSingle();

  if (error) {

    console.error(
      "getGame error:",
      error
    );

    throw error;
  }

  return data;
}


// ------------------------------------------------------------
// 開始遊戲
//
// SQL RPC：
// start_game
// ------------------------------------------------------------

export async function startGame(roomId) {

  try {

    const { data, error } = await supabase
      .rpc("start_game", {
        p_room_id: roomId
      });

    if (error) {

      console.error(
        "start_game error:",
        error
      );

      throw error;
    }

    return data;

  } catch (error) {

    console.error(
      "Failed to start game:",
      error
    );

    throw error;
  }
}


// ============================================================
// MODULE 7
// 擲骰子
// ============================================================


// ------------------------------------------------------------
// 擲骰子
//
// SQL RPC：
// roll_dice
//
// 重要：
// 這裡不在 HTML 自己決定骰子結果。
// 由 Supabase SQL RPC 決定。
// ------------------------------------------------------------

export async function rollDice(
  roomId,
  playerId
) {

  try {

    const { data, error } = await supabase
      .rpc("roll_dice", {
        p_room_id: roomId,
        p_player_id: playerId
      });

    if (error) {

      console.error(
        "roll_dice error:",
        error
      );

      throw error;
    }

    return data;

  } catch (error) {

    console.error(
      "Failed to roll dice:",
      error
    );

    throw error;
  }
}


// ============================================================
// MODULE 8
// 購買地產
// ============================================================


// ------------------------------------------------------------
// 購買地產
//
// SQL RPC：
// buy_property
// ------------------------------------------------------------

export async function buyProperty(
  roomId,
  playerId,
  boardSpaceId
) {

  try {

    const { data, error } = await supabase
      .rpc("buy_property", {
        p_room_id: roomId,
        p_player_id: playerId,
        p_board_space_id: boardSpaceId
      });

    if (error) {

      console.error(
        "buy_property error:",
        error
      );

      throw error;
    }

    return data;

  } catch (error) {

    console.error(
      "Failed to buy property:",
      error
    );

    throw error;
  }
}


// ============================================================
// MODULE 9
// 棋盤
// ============================================================


// ------------------------------------------------------------
// 取得棋盤
// ------------------------------------------------------------

export async function getBoardSpaces() {

  const { data, error } = await supabase
    .from("board_spaces")
    .select("*")
    .order("position", {
      ascending: true
    });

  if (error) {

    console.error(
      "getBoardSpaces error:",
      error
    );

    throw error;
  }

  return data || [];
}


// ============================================================
// MODULE 10
// 地產所有權
// ============================================================

export async function getPropertyOwnership(
  roomId
) {

  const { data, error } = await supabase
    .from("property_ownership")
    .select("*")
    .eq("room_id", roomId);

  if (error) {

    console.error(
      "getPropertyOwnership error:",
      error
    );

    throw error;
  }

  return data || [];
}


// ============================================================
// MODULE 11
// 遊戲事件
// ============================================================

export async function getGameEvents(
  roomId
) {

  const { data, error } = await supabase
    .from("game_events")
    .select("*")
    .eq("room_id", roomId)
    .order("created_at", {
      ascending: false
    })
    .limit(50);

  if (error) {

    console.error(
      "getGameEvents error:",
      error
    );

    throw error;
  }

  return data || [];
}


// ============================================================
// MODULE 12
// Realtime
// ============================================================


// ------------------------------------------------------------
// 訂閱整個房間
//
// 這是多人遊戲最重要的部分。
// 玩家 A 改變資料後：
// Supabase → Realtime → 玩家 B
// ------------------------------------------------------------

export function subscribeToRoom(
  roomId,
  callbacks = {}
) {

  const channelName =
    `monopoly-room-${roomId}`;

  const channel =
    supabase.channel(channelName);


  // ----------------------------------------------------------
  // rooms
  // ----------------------------------------------------------

  channel.on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "rooms",
      filter: `id=eq.${roomId}`
    },
    payload => {

      console.log(
        "Realtime rooms:",
        payload
      );

      if (
        typeof callbacks.onRoomChange ===
        "function"
      ) {

        callbacks.onRoomChange(payload);
      }
    }
  );


  // ----------------------------------------------------------
  // players
  // ----------------------------------------------------------

  channel.on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "players",
      filter: `room_id=eq.${roomId}`
    },
    payload => {

      console.log(
        "Realtime players:",
        payload
      );

      if (
        typeof callbacks.onPlayersChange ===
        "function"
      ) {

        callbacks.onPlayersChange(payload);
      }
    }
  );


  // ----------------------------------------------------------
  // games
  // ----------------------------------------------------------

  channel.on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "games",
      filter: `room_id=eq.${roomId}`
    },
    payload => {

      console.log(
        "Realtime games:",
        payload
      );

      if (
        typeof callbacks.onGameChange ===
        "function"
      ) {

        callbacks.onGameChange(payload);
      }
    }
  );


  // ----------------------------------------------------------
  // property ownership
  // ----------------------------------------------------------

  channel.on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "property_ownership",
      filter: `room_id=eq.${roomId}`
    },
    payload => {

      console.log(
        "Realtime property:",
        payload
      );

      if (
        typeof callbacks.onPropertyChange ===
        "function"
      ) {

        callbacks.onPropertyChange(payload);
      }
    }
  );


  // ----------------------------------------------------------
  // game events
  // ----------------------------------------------------------

  channel.on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "game_events",
      filter: `room_id=eq.${roomId}`
    },
    payload => {

      console.log(
        "Realtime game event:",
        payload
      );

      if (
        typeof callbacks.onGameEvent ===
        "function"
      ) {

        callbacks.onGameEvent(payload);
      }
    }
  );


  // ----------------------------------------------------------
  // 建立 Realtime connection
  // ----------------------------------------------------------

  channel.subscribe(status => {

    console.log(
      `Realtime [${channelName}]:`,
      status
    );

    if (
      typeof callbacks.onStatus ===
      "function"
    ) {

      callbacks.onStatus(status);
    }
  });


  return channel;
}


// ============================================================
// MODULE 13
// 解除 Realtime
// ============================================================

export async function unsubscribeFromRoom(
  channel
) {

  if (!channel) {
    return;
  }

  try {

    await supabase.removeChannel(
      channel
    );

  } catch (error) {

    console.error(
      "Failed to unsubscribe:",
      error
    );
  }
}


// ============================================================
// MODULE 14
// 取得完整遊戲狀態
// ============================================================

export async function getFullGameState(
  roomId
) {

  try {

    const [
      room,
      players,
      game,
      boardSpaces,
      ownership,
      events
    ] = await Promise.all([

      getRoomById(roomId),

      getPlayers(roomId),

      getGame(roomId),

      getBoardSpaces(),

      getPropertyOwnership(roomId),

      getGameEvents(roomId)

    ]);


    return {

      room,

      players,

      game,

      boardSpaces,

      ownership,

      events

    };

  } catch (error) {

    console.error(
      "Failed to load game state:",
      error
    );

    throw error;
  }
}


// ============================================================
// MODULE 15
// 依 ID 取得房間
// ============================================================

export async function getRoomById(
  roomId
) {

  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId)
    .maybeSingle();

  if (error) {

    console.error(
      "getRoomById error:",
      error
    );

    throw error;
  }

  return data;
}


// ============================================================
// MODULE 16
// 等待 Realtime 完成
// ============================================================

export function waitForRealtime(
  roomId,
  timeout = 10000
) {

  return new Promise((resolve, reject) => {

    let finished = false;

    const timer = setTimeout(() => {

      if (finished) {
        return;
      }

      finished = true;

      reject(
        new Error(
          "Realtime connection timeout"
        )
      );

    }, timeout);


    const channel =
      supabase.channel(
        `monopoly-test-${roomId}`
      );


    channel.subscribe(status => {

      if (status === "SUBSCRIBED") {

        if (finished) {
          return;
        }

        finished = true;

        clearTimeout(timer);

        supabase.removeChannel(
          channel
        );

        resolve(true);
      }


      if (status === "CHANNEL_ERROR") {

        if (finished) {
          return;
        }

        finished = true;

        clearTimeout(timer);

        supabase.removeChannel(
          channel
        );

        reject(
          new Error(
            "Realtime channel error"
          )
        );
      }

    });

  });
}


// ============================================================
// MODULE 17
// Export
// ============================================================

export default supabase;
