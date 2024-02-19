// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import "mx-global";
import { Big } from "big.js";

// BEGIN EXTRA CODE
// END EXTRA CODE

/**
 * Searching users on GitHub.com, it could find users via various criteria. This action returns up to 100 results.
 * @param {string} query
 * @param {string} userEntity
 * @returns {Promise.<MxObject[]>}
 */
export async function JavaScript_SearchGitHubUsers(query, userEntity) {
	// BEGIN USER CODE
	//throw new Error("JavaScript action was not implemented");

	if(!query){
		return [];
	}

	const url="https://api.github.com/search/users?q="+query;
	const response=await fetch(url);
	const josonData= await response.json();
	logger.debug("count",josonData.total_count);
	const gitHubUsers=josonData.items.map(createGitHubUser);
	return Promise.all(gitHubUsers);

	function createGitHubUser(user){
		return new Promise(function(resolve, reject){
			mx.data.create({
				entity: userEntity,
				callback: function(mxObject){
					mxObject.getAttributes().forEach(function(attributeName){
						//search github ID name--attributeValue
						const attributeValue=user[attributeName];
						if(attributeValue){
							mxObject.set(attributeName,attributeValue);
						}
					});
					resolve(mxObject);
				},
				error: function(error){
					reject("Could create object: "+error.message);
				}
			});
		});
	}

	// END USER CODE
}
