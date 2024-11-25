import express from "express";
import {
  getAllJadwalPenerbangan,
  getJadwalPenerbanganById,
  createJadwalPenerbangan,
  updateJadwalPenerbangan,
  deleteJadwalPenerbangan,
  searchJadwalPenerbangan,
} from "../controllers/jadwalPenerbanganController.js";

const router = express.Router();

// Routes for flight schedule management
router.get("/jadwal-penerbangan", getAllJadwalPenerbangan);
router.get("/jadwal-penerbangan/:id", getJadwalPenerbanganById);
router.post("/jadwal-penerbangan/add", createJadwalPenerbangan);
router.put(
  "/jadwal-penerbangan/update/:id",

  updateJadwalPenerbangan
);
router.delete("/jadwal-penerbangan/:id", deleteJadwalPenerbangan);
router.delete("/jadwal-penerbangan/search", searchJadwalPenerbangan);

export default router;
