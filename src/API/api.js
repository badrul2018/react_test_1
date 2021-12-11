import restapi from "../axios.config";

//Foods APIs:
export async function getFoodlistOfCanadian() {
  return await restapi.get("filter.php?a=Canadian");
}
export async function getFoodDetailsById(id) {
    return await restapi.get(
      `lookup.php?i=${id}`
    );
  }