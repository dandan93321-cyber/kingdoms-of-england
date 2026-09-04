// ============================================================
// SUPABASE CONNECTION MODULE
// 檔案：js/supabase.js
// ============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ------------------------------------------------------------
// Supabase 專案設定
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
  SUPABASE_PUBLISHABLE_KEY
);

// ------------------------------------------------------------
// 測試連線
// ------------------------------------------------------------

export async function testSupabaseConnection() {
  try {
    const { error } = await supabase
      .from("rooms")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Supabase 連線/資料表測試失敗：", error);
      return false;
    }

    console.log("Supabase 連線成功！");
    return true;

  } catch (error) {
    console.error("Supabase 連線錯誤：", error);
    return false;
  }
}
