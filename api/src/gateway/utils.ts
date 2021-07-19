export const generateID = (ws: any) => {
    let date = Date.now() - 1609459200 * 1000;
    let num: number = 0;


    ws.ids ? ws.ids++ : ws.ids = 0;
    num += date;
    num += ws.ids;
    return num;
}