import BaseController from "./BaseController";
import formatter from "../model/formatter";
import FileUploader from "sap/ui/unified/FileUploader";
import FileUploaderParameter from "sap/ui/unified/FileUploaderParameter";
import Event from "sap/ui/base/Event";
import MessageToast from "sap/m/MessageToast";


/**
 * @namespace miyasuta.file2googledrive.controller
 */
export default class Main extends BaseController {
	private formatter = formatter;

	public async handleUploadPress(): Promise<void> {
		const oFileUploader = this.byId("fileUploader") as FileUploader;
		await oFileUploader.checkFileReadable();

		//set headers
		oFileUploader.removeAllHeaderParameters();
		const fileName = oFileUploader.getValue();
		oFileUploader.addHeaderParameter(new FileUploaderParameter({
			name: "filename",
			value: fileName
		}));

		oFileUploader.upload();
	}

	public handleUploadComplete(oEvent: Event): void {
		const iHttpStatusCode = oEvent.getParameter("status") as number
		let	sMessage: string;

		if (iHttpStatusCode) {
			sMessage = iHttpStatusCode === 200 ? "Upload Success" : "Upload Error";
			MessageToast.show(sMessage);
		}
	}

}
