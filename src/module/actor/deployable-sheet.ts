import { LancerDeployableSheetData } from "../interfaces";
import { LANCER } from "../config";
import { LancerActorSheet } from "./lancer-actor-sheet";
import { LancerActor } from "./lancer-actor";
const lp = LANCER.log_prefix;

/**
 * Extend the basic ActorSheet
 */
export class LancerDeployableSheet extends LancerActorSheet<LancerDeployableSheetData> {
  /**
   * A convenience reference to the Actor entity
   */
  // get actor(): LancerPilot {
  //   return this.actor;
  // };

  /* -------------------------------------------- */

  /**
   * Extend and override the default options used by the NPC Sheet
   */
  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      classes: ["lancer", "sheet", "actor", "npc"],
      template: "systems/lancer/templates/actor/deployable.html",
      width: 800,
      height: 800,
    };
  }

  /* -------------------------------------------- */

  /**
   * @override
   * Activate event listeners using the prepared sheet HTML
   * @param html {HTMLElement}   The prepared HTML object ready to be rendered into the DOM
   */
  activateListeners(html: JQuery<HTMLElement>) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Add or Remove options
    // Yes, theoretically this could be abstracted out to one function. You do it then.
  }

  /* -------------------------------------------- */

  /**
   * Prepare data for rendering the Actor sheet
   * The prepared data object contains both the actor data as well as additional sheet options
   */
  getData(): LancerDeployableSheetData {
    const data: LancerDeployableSheetData = super.getData() as LancerDeployableSheetData;

    // Populate name if blank (new Actor)
    if (data.data.name === "") {
      data.data.name = data.actor.name;
    }

    console.log(`${lp} Deployable data: `, data);
    return data;
  }

  /**
   * Implement the _updateObject method as required by the parent class spec
   * This defines how to update the subject of the form when the form is submitted
   */
  protected _updateObject(_event: Event | JQuery.Event, formData: any): Promise<LancerActor> {
    // Copy the new name to the prototype token.
    formData["token.name"] = formData["name"];

    formData = this._updateTokenImage(formData);

    // Update the Actor
    return this.object.update(formData);
  }
}
