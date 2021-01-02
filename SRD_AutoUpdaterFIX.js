/*:ru
 * @plugindesc ĐŃĐżŃĐ°Đ˛ĐťŃĐľŃ ŃĐžĐ˛ĐźĐľŃŃĐ¸ĐźĐžŃŃŃ ĐżĐťĐ°ĐłĐ¸Đ˝Đ° SumRndmDde Auto Updater Ń ĐżĐťĐ°ĐłĐ¸Đ˝Đ°ĐźĐ¸ ĐŻĐ˝ŃĐťĐ°Ń 
 * @author ĐĐźĐ¸ŃŃĐ¸Đş
 *
 * @help
 * ĐŃĐżŃĐ°Đ˛ĐťŃĐľŃ ŃĐžĐ˛ĐźĐľŃŃĐ¸ĐźĐžŃŃŃ ĐźĐľĐśĐ´Ń ĐżĐťĐ°ĐłĐ¸Đ˝ĐžĐź SumRndmDde Auto Updater
 * Đ¸ ĐżĐťĐ°ĐłĐ¸Đ˝Đ°ĐźĐ¸ ĐŻĐ˝ŃĐťĐ°Ń.
 *
 * ĐĐłĐž Đ˝ĐľĐžĐąŃĐžĐ´Đ¸ĐźĐž ŃŃŃĐ°Đ˝ĐžĐ˛Đ¸ŃŃ ĐżĐžŃĐťĐľ ĐżĐťĐ°ĐłĐ¸Đ˝Đ° SRD_AutoUpdater.
 *
 * ĐŃĐžĐąĐťĐľĐźĐ° Đ˛ĐžŃ Đ˛ ŃŃĐź. ĐĐ˛ŃĐžĐžĐąĐ˝ĐžĐ˛ĐťĐľĐ˝Đ¸Đľ ĐżĐľŃĐľĐˇĐ°ĐłŃŃĐśĐ°ĐľŃ ĐąĐ°ĐˇŃ Đ´Đ°Đ˝Đ˝ŃŃ.
 * ĐĐťĐ°ĐłĐ¸Đ˝Ń ĐŻĐ˝ŃĐťĐ°Ń ŃĐśĐľ ĐžŃŃĐ°ĐąĐžŃĐ°ĐťĐ¸ Đ¸ Đ¸ĐˇĐźĐľĐ˝Đ¸ĐťĐ¸ ĐąĐ°ĐˇŃ Đ´Đ°Đ˝Đ˝ŃŃ,
 * ĐžĐ´Đ˝Đ°ĐşĐž SRD_AutoUpdater ĐˇĐ°ĐłŃŃĐˇĐ¸Đť ĐąĐ°ĐˇŃ Đ´Đ°Đ˝Đ˝ŃŃ ĐľŃŃ ŃĐ°Đˇ (Đ˛ĐžĐˇĐźĐžĐśĐ˝Đž,
 * ĐžĐąĐ˝ĐžĐ˛ĐťŃĐ˝Đ˝ŃŃ), ĐżĐžŃŃĐžĐźŃ ĐżĐťĐ°ĐłĐ¸Đ˝Ń ĐŻĐ˝ŃĐťĐ°Ń Đ˝Đ°Đ´Đž ĐżĐľŃĐľĐˇĐ°ĐłŃŃĐˇĐ¸ŃŃ.
 *
 * ĐĐťŃ ŃŃĐžĐłĐž Ń ĐźĐľĐ˝ŃŃ Đ˛Đ˝ŃŃŃĐ¸ ĐžĐąŃĐľĐşŃĐ° Yanfly ĐżĐľŃĐľĐźĐľĐ˝Đ˝ŃĐľ, Đ˝Đ°ĐˇĐ˛Đ°Đ˝Đ¸Ń
 * ĐşĐžŃĐžŃŃŃ Đ˝Đ°ŃĐ¸Đ˝Đ°ŃŃŃŃ Ń _loaded_YEP_ Đ˝Đ° false, ŃŃĐž ĐˇĐ°ŃŃĐ°Đ˛Đ¸Ń ĐżĐťĐ°ĐłĐ¸Đ˝Ń
 * ĐŻĐ˝ŃĐťĐ°Ń ĐżĐžĐ˛ŃĐžŃĐ¸ŃŃ Đ¸Đ˝Đ¸ŃĐ¸Đ°ĐťĐ¸ĐˇĐ°ŃĐ¸Ń.
 *
 * Đ­Đ˘Đ ĐĽĐĐ. ĐĐ˝ ĐźĐžĐśĐľŃ Đ˝Đľ ŃŃĐ°ĐąĐžŃĐ°ŃŃ, ĐľŃĐťĐ¸ ĐżĐťĐ°ĐłĐ¸Đ˝ ĐŻĐ˝ŃĐťĐ°Ń Đ˝Đľ ĐżŃĐžŃŃĐž
 * Đ¸Đ˝Đ¸ŃĐ¸Đ°ĐťĐ¸ĐˇĐ¸ŃŃĐľŃ ĐźĐ°ŃŃĐ¸Đ˛Ń $dataĐ§ŃĐžĐĐ¸ĐąŃĐ´Ń, Đ° Đ´ĐľĐťĐ°ĐľŃ ĐľŃŃ ĐşĐ°ĐşĐ¸Đľ-ŃĐž
 * ĐżĐľŃĐľĐźĐľĐ˝Đ˝ŃĐľ. ĐĐž Ń ĐżĐťĐ°ĐłĐ¸Đ˝ĐžĐź YEP_EquipCore.js ŃŃĐžŃ ŃĐ°Đş ŃĐ°ĐąĐžŃĐ°ĐľŃ.
 * ĐŃĐťĐ¸ ĐąŃĐ´ŃŃ ĐżŃĐžĐąĐťĐľĐźŃ Ń Đ´ŃŃĐłĐ¸ĐźĐ¸ ĐżĐťĐ°ĐłĐ¸Đ˝Đ°ĐźĐ¸ â Đ˝Đ°Đ´Đž Đ¸ŃĐżŃĐ°Đ˛ĐťŃŃŃ Đ¸Ń
 * Đ´ĐťŃ ĐşĐ°ĐśĐ´ĐžĐłĐž ĐżĐťĐ°ĐłĐ¸Đ˝Đ° ĐžŃĐ´ĐľĐťŃĐ˝Đž. ĐĐ¸ŃĐ¸ŃĐľ Đ˛ ŃŃĐžĐš ŃĐľĐźĐľ Đ˝Đ° ĐĄĐ˛ĐľŃĐťĐžĐš:
 * http://rpgmaker.ru/forum/voprosy-po-skriptam-mv/62002-mv-zhestkij-konflikt-plagina
 * ĐŁĐşĐ°ĐśĐ¸ŃĐľ, Ń ĐşĐ°ĐşĐ¸Đź Đ¸ĐźĐľĐ˝Đ˝Đž ĐżĐťĐ°ĐłĐ¸Đ˝Đ°ĐźĐ¸ ŃŃĐž Đ˝Đľ ŃĐ°ĐąĐžŃĐ°ĐľŃ, Ń ŃĐ°ĐˇĐąĐľŃŃŃŃ.
 * ĐĄĐżĐ°ŃĐ¸ĐąĐž!
 */
 /*:
  * @plugindesc Fixes compatibility between the SumRndmDde Auto Updater and Yanfly's plugins 
  * @author Dmytryk
  *
  * @help
  * This plugin fixes the compatibility between SumRndmDde's Auto Updater plugin
  * and Yanfly's plugins.
  *
  * It needs to be installed after the SRD_AutoUpdater plugin.
  * 
  * The problem is as follows. The auto-updater reloads the database.
  * Yanfly's plugins have already finished working and have changed
  * the database, but the SRD_AutoUpdater plugin re-loaded the database
  * (probably after updating it), so Yanfly's plugins need to be re-run.
  *
  * For this, I'm changing the variables inside the Yanfly object if
  * their name starts with _loaded_YEP_ to false, which triggers
  * re-initialization of Yanfly's plugins.
  *
  * THIS IS A HACK. It might not work if Yanfly's plugin doesn't just
  * initialise $dataSomething arrays but does more things to them.
  * But this hack works with YEP_EquipCore.js. If you have problems
  * with other plugins, they need to be fixed on a plugin-per-plugin basis.
  * Write in the following topic on the Zone of Light forum:
  * http://rpgmaker.ru/forum/voprosy-po-skriptam-mv/62002-mv-zhestkij-konflikt-plagina
  * Tell me which plugins cause conflicts, I'll look into this. Thanks!
  */

var Imported = Imported || {};
Imported["Dmytryk's fix for SumRndmDde Auto Updater"] = 1.00;

Dmy_Scene_AutoUpdate_gotoSceneBoot = Scene_AutoUpdate.prototype.gotoSceneBoot;
Scene_AutoUpdate.prototype.gotoSceneBoot = function() {
  for (var property in Yanfly) {
    if (property.match(/^_loaded_YEP_/) && Yanfly[property] === true) {
      Yanfly[property] = false;
    }
  }
  Dmy_Scene_AutoUpdate_gotoSceneBoot.call(this);
}