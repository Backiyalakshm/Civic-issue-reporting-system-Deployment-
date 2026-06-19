package com.civic.service;

import com.civic.entity.Asset;
import com.civic.entity.AssetMaintenanceLog;
import com.civic.entity.User;
import com.civic.repository.AssetMaintenanceLogRepository;
import com.civic.repository.AssetRepository;
import com.civic.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AssetService {
    
    @Autowired
    private AssetRepository assetRepository;
    
    @Autowired
    private AssetMaintenanceLogRepository maintenanceLogRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Asset createAsset(Asset asset) {
        return assetRepository.save(asset);
    }
    
    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }
    
    public Asset getAssetById(Long id) {
        return assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found"));
    }
    
    public Asset updateAssetStatus(Long assetId, Asset.Status status, String remarks, Long updatedBy) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new RuntimeException("Asset not found"));
        User user = userRepository.findById(updatedBy)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        asset.setStatus(status);
        asset.setLastMaintenanceDate(LocalDate.now());
        
        Asset savedAsset = assetRepository.save(asset);
        
        // Create maintenance log
        AssetMaintenanceLog log = new AssetMaintenanceLog();
        log.setAsset(asset);
        log.setRemarks(remarks);
        log.setUpdatedBy(user);
        log.setDate(LocalDate.now());
        maintenanceLogRepository.save(log);
        
        return savedAsset;
    }
    
    public List<AssetMaintenanceLog> getAssetMaintenanceHistory(Long assetId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new RuntimeException("Asset not found"));
        return maintenanceLogRepository.findByAssetOrderByDateDesc(asset);
    }
    
    public void deleteAsset(Long id) {
        assetRepository.deleteById(id);
    }
}
