import { Injector } from "@angular/core";
import { NodeEditor, GetSchemes, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
    ConnectionPlugin,
    Presets as ConnectionPresets
} from "rete-connection-plugin";
import { AngularPlugin, Presets, AngularArea2D } from "rete-angular-plugin/15";
import { addCustomBackground } from "../custom-background";
import { CustomNodeComponent } from "./custom-node/custom-node.component";
import { CustomSocketComponent } from "./custom-socket/custom-socket.component";
import { CustomConnectionComponent } from "./custom-connection/custom-connection.component";

type Schemes = GetSchemes<
    ClassicPreset.Node,
    ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = AngularArea2D<Schemes>;

export async function createEditor(container: HTMLElement, injector: Injector) {
    const socket = new ClassicPreset.Socket("socket");

    const editor = new NodeEditor<Schemes>();
    const area = new AreaPlugin<Schemes, AreaExtra>(container);
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();
    const render = new AngularPlugin<Schemes, AreaExtra>({ injector });


    render.addPreset(
        Presets.classic.setup({
            customize: {
                node: () => {
                    return CustomNodeComponent;
                },
                socket: () => {
                    return CustomSocketComponent;
                },
                connection: () => {
                    return CustomConnectionComponent;
                }
            }
        })
    )

    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
        accumulating: AreaExtensions.accumulateOnCtrl()
    });

    render.addPreset(Presets.classic.setup());
    connection.addPreset(ConnectionPresets.classic.setup());

    editor.use(area);
    area.use(connection);
    area.use(render);

    addCustomBackground(area);

    AreaExtensions.simpleNodesOrder(area);

    const a = new ClassicPreset.Node("A");
    a.addControl(
        "a",
        new ClassicPreset.InputControl("text", { initial: "hello" })
    );
    a.addOutput("a", new ClassicPreset.Output(socket));
    await editor.addNode(a);

    const b = new ClassicPreset.Node("B");
    b.addControl(
        "b",
        new ClassicPreset.InputControl("text", { initial: "hello" })
    );
    b.addInput("b", new ClassicPreset.Input(socket));
    await editor.addNode(b);

    await area.translate(b.id, { x: 320, y: 0 });

    await editor.addConnection(new ClassicPreset.Connection(a, "a", b, "b"));

    AreaExtensions.zoomAt(area, editor.getNodes());

    return () => area.destroy();
}
