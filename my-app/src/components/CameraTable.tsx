// File: src/components/CameraTable.tsx
import React from "react";
import axios from "axios";
import type { Camera } from "../types/Camera";
import { PiWarningCircle } from "react-icons/pi";
import { RiCloudLine } from "react-icons/ri";
import disk from "../assets/disk.png"

interface Props {
  cameras: Camera[];
  setCameras: React.Dispatch<React.SetStateAction<Camera[]>>;
  originalCameras: Camera[];
}

const CameraTable: React.FC<Props> = ({
  cameras,
  setCameras,
  originalCameras,
}) => {
  const handleDelete = (id: number) => {
    setCameras(originalCameras.filter((cam) => cam.id !== id));
  };

  const toggleStatus = async (camera: Camera) => {
    const newStatus = camera.status === "Active" ? "Inactive" : "Active";
    await axios.post(
      "https://api-app-staging.wobot.ai/app/v1/update/camera/status",
      { id: camera.id, status: newStatus },
      { headers: { Authorization: `Bearer 4ApVMIn5sTxeW7GQ5VWeWiy` } }
    );
    setCameras(
      originalCameras.map((cam) =>
        cam.id === camera.id ? { ...cam, status: newStatus } : cam
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[800px] w-full mt-1 text-sm font-inter bg-white">
        <thead>
          <tr className="text-[#8D8D8D] text-left text-[12px] font-semibold border-t border-b border-[#DADADA]">
            <th className="pl-6 py-[1.125rem] font-medium">
              <input type="checkbox" className="form-checkbox w-4 h-4" />
            </th>
            <th className="px-3 py-[1.125rem] font-medium font-inter text-[0.875rem]">
              NAME
            </th>
            <th className="px-3 py-[1.125rem] font-medium font-inter text-[0.875rem]">
              HEALTH
            </th>
            <th className="px-3 py-[1.125rem] font-medium font-inter text-[0.875rem]">
              LOCATION
            </th>
            <th className="px-3 py-[1.125rem] font-medium font-inter text-[0.875rem]">
              RECORDER
            </th>
            <th className="px-3 py-[1.125rem] font-medium font-inter text-[0.875rem]">
              TASKS
            </th>
            <th className="px-3 py-[1.125rem] text-center font-medium font-inter text-[0.875rem]">
              STATUS
            </th>
            <th className="px-3 text-center py-[1.125rem] font-medium font-inter text-[0.875rem]">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {cameras.map((camera) => (
            <tr
              key={camera.id}
              className="border-b border-[#DADADA] text-[#545454] hover:bg-gray-50"
            >
              <td className="pl-6 py-[1.125rem]">
                <input type="checkbox" className="form-checkbox w-4 h-4" />
              </td>
              <td className="px-3 py-4 text-[#333]">
                <div className="flex items-start gap-1">
                  <span
                    className={`w-2.5 h-2.5 ${
                      camera.current_status === "Online"
                        ? "bg-[#029262]"
                        : "bg-[#DC3545]"
                    }  rounded-full mt-1`}
                  ></span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-inter text-[0.875rem] text-[#545454]">
                        {camera.name}
                      </span>
                      {camera.hasWarning && (
                        <PiWarningCircle className="h-4 w-4 text-[#FF7E17]" />
                      )}
                    </div>
                    <span className="text-[0.75rem] text-[#7E7E7E]">
                      sherwinwilliams@wobot.ai
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-3 py-4 text-[#333]">
                <div className="flex gap-2">
                  <div className="flex gap-1 items-center">
                    <RiCloudLine className="text-[#A0A0A0] h-4 w-4" />
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <div
                        className="absolute w-full h-full rounded-full"
                        style={{
                          background: `conic-gradient(${
                            camera.health.cloud === "A"
                              ? "#029262"
                              : "#FF8C00"
                          } 75%, #E5E5E5 0deg)`,
                        }}
                      ></div>
                      <div className="font-inter h-4 w-4 font-medium rounded-full bg-white flex items-center justify-center text-[0.625rem] text-[#343434] z-10">
                        {camera.health.cloud}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img src={disk} alt="disk" className="h-4 w-4" />
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <div
                        className="absolute w-full h-full rounded-full"
                        style={{
                          background: `conic-gradient(${
                            camera.health.device === "A"
                              ? "#029262"
                              : "#FF8C00"
                          } 75%, #E5E5E5 0deg)`,
                        }}
                      ></div>
                      <div className="font-inter h-4 w-4 font-medium rounded-full bg-white flex items-center justify-center text-[0.625rem] text-[#343434] z-10">
                        {camera.health.device}
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-4 font-inter text-[0.875rem] text-[#545454]">
                {camera.location}
              </td>
              <td className="px-3 py-4 font-inter text-[0.875rem] text-[#545454]">
                {camera.recorder || "N/A"}
              </td>
              <td className="px-3 py-4 font-inter text-[0.875rem] text-[#545454]">
                {camera.tasks || "N/A"} Tasks
              </td>
              <td className="px-3 py-4 text-center">
                <span
                  onClick={() => toggleStatus(camera)}
                  className={`cursor-pointer px-2 py-1 text-xs rounded-xs font-medium font-inter inline-block text-center text-[0.75rem] ${
                    camera.status === "Active"
                      ? "bg-[#D9F7E7] text-[#00A86B]"
                      : "bg-[#E4E4E4] text-[#666]"
                  }`}
                >
                  {camera.status}
                </span>
              </td>
              <td className="px-3 py-4 text-center cursor-pointer">
                <button
                  onClick={() => handleDelete(camera.id)}
                  className="text-[#545454] cursor-pointer hover:text-[#555] h-4 w-4"
                >
                  ⃠
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CameraTable;
