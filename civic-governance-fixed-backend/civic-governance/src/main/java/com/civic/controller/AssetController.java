package com.civic.controller;

import com.civic.entity.Asset;
import com.civic.entity.AssetMaintenanceLog;
import com.civic.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AssetController {
    
    @Autowired
    private AssetService assetService;
    
    @PostMapping("/create")
    public ResponseEntity<Asset> createAsset(@RequestBody Asset asset) {
        return ResponseEntity.ok(assetService.createAsset(asset));
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Asset>> getAllAssets() {
        return ResponseEntity.ok(assetService.getAllAssets());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long id) {
        return ResponseEntity.ok(assetService.getAssetById(id));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Asset> updateAssetStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request) {
        Asset.Status status = Asset.Status.valueOf((String) request.get("status"));
        String remarks = (String) request.get("remarks");
        Long updatedBy = Long.valueOf(request.get("updatedBy").toString());
        
        return ResponseEntity.ok(assetService.updateAssetStatus(id, status, remarks, updatedBy));
    }
    
    @GetMapping("/{id}/history")
    public ResponseEntity<List<AssetMaintenanceLog>> getMaintenanceHistory(@PathVariable Long id) {
        return ResponseEntity.ok(assetService.getAssetMaintenanceHistory(id));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAsset(@PathVariable Long id) {
        assetService.deleteAsset(id);
        return ResponseEntity.ok(Map.of("message", "Asset deleted successfully"));
    }
}
