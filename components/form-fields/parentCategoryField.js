export default function ParentCategoryField({register, isSubmitting, errors, categoryOptions}) {

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
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Parent Cat.</span>
      <select
        className={"h-20 select " + (errors.parent ? 'select-error' : 'select-primary') + " select-bordered select-sm flex-1"}
        type="json"
        {...register(
          "parent", {
            required: false
        })}
        disabled={isSubmitting}
      >
        {catOptionElements}
      </select>
    </label>
  </div>
  { errors.parent && <span className="text-error label-text">
    { errors.parent?.type === 'required' && "Parent is required." }
  </span>}
  </>
}
