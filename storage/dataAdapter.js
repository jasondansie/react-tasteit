//this is a better way to write the adapter
// this make sure the items inputed are numbers.

const adapt = (item) => {
    console.log("calling adapt: ", item);
    return Object.assign(item, {
        id: +item.id,
    });
}

module.exports = { adapt }