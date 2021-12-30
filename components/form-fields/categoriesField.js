export default function CategoriesField({register, isSubmitting, errors, categoryOptions}) {

  let catOptionElements = (
    categoryOptions.map(function(catOp, idx){

      let parentString = '';
      if (catOp.parent) {
        let nextCat = catOp;

        while (nextCat != undefined) {
          nextCat = categoryOptions.find(x => x.id == nextCat.parent);
          if (nextCat) {
            parentString = nextCat.title + ' > ' + parentString;
          }
        }
      }

      return <option key={idx} value={catOp.id}>{parentString}{catOp.title}</option>
    })
  );

  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Categories</span>
      <select
        className={"h-20 select " + (errors.categories ? 'select-error' : 'select-primary') + " select-bordered select-sm flex-1"}
        type="json"
        {...register(
          "categories", {
            required: true
        })}
        disabled={isSubmitting}
        multiple
      >
        {catOptionElements}
      </select>
    </label>
  </div>
  { errors.categories && <span className="text-error label-text">
    { errors.categories?.type === 'required' && "Categories are required." }
  </span>}
  </>
}
