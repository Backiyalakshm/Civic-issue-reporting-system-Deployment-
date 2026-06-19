package com.civic.repository;

import com.civic.entity.Asset;
import com.civic.entity.AssetMaintenanceLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetMaintenanceLogRepository extends JpaRepository<AssetMaintenanceLog, Long> {
    List<AssetMaintenanceLog> findByAssetOrderByDateDesc(Asset asset);
}
